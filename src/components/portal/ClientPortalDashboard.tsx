import React, { useState } from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  MessageSquare,
  Download,
  Send,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Building,
  UserCheck,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira, formatDate, createWhatsAppUrl } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { ClientProject, ProjectMilestone, RevisionPriority, Invoice } from '../../types';
import { logAction } from '../../utils/logger';

export const ClientPortalDashboard: React.FC = () => {
  const {
    currentUser,
    clientProjects,
    invoices,
    messages,
    sendMessage,
    approveMilestone,
    submitRevisionRequest,
    payInvoiceWithPaystack,
    config,
    logout,
    navigateTo,
    setIsAuthModalOpen,
    setIsProfileModalOpen
  } = useStudio();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'milestones' | 'invoices' | 'messages' | 'deliverables'>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Message input state
  const [msgInput, setMsgInput] = useState('');

  // Revision Request Modal State
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revMilestoneId, setRevMilestoneId] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revDesc, setRevDesc] = useState('');
  const [revPriority, setRevPriority] = useState<RevisionPriority>('medium');

  // Receipt Modal State
  const [viewingReceiptInvoice, setViewingReceiptInvoice] = useState<Invoice | null>(null);
  const [paymentProcessingId, setPaymentProcessingId] = useState<string | null>(null);
  const [paymentAlert, setPaymentAlert] = useState<{ success: boolean; message: string } | null>(null);

  // Guard if not signed in as customer
  if (!currentUser) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
          <UserCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold font-display text-white">Client Portal Access</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Sign in to view your project milestones, submit revision requests, pay invoices, and download deliverables.
        </p>
        <Button
          variant="primary"
          actionName="Portal Guard: Sign In"
          onClick={() => setIsAuthModalOpen(true)}
          className="w-full"
        >
          Sign In to Customer Portal
        </Button>
      </div>
    );
  }

  // Filter projects and invoices for this customer (Security: Private record isolation)
  const myProjects = clientProjects.filter(p => p.customerId === currentUser.id || p.customerEmail.toLowerCase() === currentUser.email.toLowerCase());
  const activeProject = myProjects.find(p => p.id === selectedProjectId) || myProjects[0] || null;
  const myInvoices = invoices.filter(i => i.customerId === currentUser.id || i.customerEmail.toLowerCase() === currentUser.email.toLowerCase());
  const myMessages = activeProject ? messages.filter(m => m.projectId === activeProject.id) : [];

  const handleApproveMilestone = (milestoneId: string) => {
    if (!activeProject) return;
    approveMilestone(activeProject.id, milestoneId);
    logAction('Client Portal: Approved Milestone', { projectId: activeProject.id, milestoneId });
  };

  const handleOpenRevisionModal = (milestone: ProjectMilestone) => {
    setRevMilestoneId(milestone.id);
    setRevTitle(`Revision: ${milestone.title}`);
    setRevDesc('');
    setRevPriority('medium');
    setIsRevisionModalOpen(true);
  };

  const handleSubmitRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !revTitle.trim() || !revDesc.trim()) return;

    const milestone = activeProject.milestones.find(m => m.id === revMilestoneId);
    submitRevisionRequest(activeProject.id, {
      milestoneId: revMilestoneId,
      milestoneTitle: milestone?.title || 'General Scope',
      title: revTitle.trim(),
      description: revDesc.trim(),
      priority: revPriority
    });

    setIsRevisionModalOpen(false);
    setRevDesc('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !msgInput.trim()) return;
    sendMessage(activeProject.id, msgInput.trim());
    setMsgInput('');
  };

  const handlePayInvoice = async (invoice: Invoice) => {
    setPaymentProcessingId(invoice.id);
    setPaymentAlert(null);
    try {
      const result = await payInvoiceWithPaystack(invoice.id);
      setPaymentAlert(result);
      if (result.success) {
        setViewingReceiptInvoice(invoice);
      }
    } catch (err: any) {
      setPaymentAlert({ success: false, message: err.message || 'Payment processing failed.' });
    } finally {
      setPaymentProcessingId(null);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Welcome Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Client Portal</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">{currentUser.company || 'Client Workspace'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Welcome back, {currentUser.name}
          </h1>
          <div className="text-xs text-slate-400 font-mono">
            Account: {currentUser.email}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            actionName="Portal: Account Settings"
            onClick={() => setIsProfileModalOpen(true)}
          >
            Account Settings
          </Button>

          <Button
            size="sm"
            variant="outline"
            actionName="Portal: WhatsApp Studio"
            onClick={() => {
              const msg = `Hello Jephthah, this is ${currentUser.name} checking in from my project dashboard.`;
              window.open(createWhatsAppUrl(config.whatsappNumber, msg), '_blank', 'noopener,noreferrer');
            }}
            icon={<MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
          >
            WhatsApp
          </Button>

          <Button
            size="sm"
            variant="ghost"
            actionName="Portal Logout"
            onClick={logout}
            className="text-rose-400 hover:text-rose-300"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projects ({myProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'milestones'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Milestones & Approvals</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Invoices & Paystack ({myInvoices.filter(i => i.status === 'pending').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'messages'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Project Messages ({myMessages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deliverables')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'deliverables'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Downloads & Files</span>
        </button>
      </div>

      {paymentAlert && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
          paymentAlert.success
            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {paymentAlert.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{paymentAlert.message}</span>
          </div>
          <button onClick={() => setPaymentAlert(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Tab 1: Project Overview */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {myProjects.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <FolderKanban className="w-8 h-8 text-slate-500 mx-auto" />
              <div className="text-sm font-bold text-white">No Active Projects Yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Once your project enquiry is approved by Jephthah Ozero, your live development workspace will be initialized here.
              </p>
              <Button
                size="sm"
                variant="primary"
                actionName="Portal: Start Project Request"
                onClick={() => navigateTo('contact', 'enquiry-form-section')}
              >
                Submit a Project Scope
              </Button>
            </div>
          ) : (
            myProjects.map(proj => {
              const approvedCount = proj.milestones.filter(m => m.status === 'approved').length;
              const progressPct = Math.round((approvedCount / proj.milestones.length) * 100) || 0;

              return (
                <div key={proj.id} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{proj.serviceCategory}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{proj.status.replace('_', ' ')}</span>
                      </div>
                      <h2 className="text-2xl font-bold font-display text-white mt-1">{proj.title}</h2>
                      <div className="text-xs text-slate-400 mt-1">
                        Timeline: {proj.startDate} → {proj.targetDate}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Total Project Value</div>
                      <div className="text-2xl font-bold font-mono text-white mt-0.5">{formatNaira(proj.budgetNGN)}</div>
                      <div className="text-[11px] text-emerald-400 font-mono">Paid: {formatNaira(proj.totalPaidNGN)}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-semibold">Milestone Progress: {progressPct}% Completed</span>
                      <span className="text-slate-400 font-mono">{approvedCount} of {proj.milestones.length} Milestones Approved</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      size="sm"
                      variant="primary"
                      actionName="Portal: View Milestones"
                      onClick={() => {
                        setSelectedProjectId(proj.id);
                        setActiveTab('milestones');
                      }}
                      iconRight={<ChevronRight className="w-4 h-4" />}
                    >
                      Review Milestones & Sign Off
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      actionName="Portal: View Messages"
                      onClick={() => {
                        setSelectedProjectId(proj.id);
                        setActiveTab('messages');
                      }}
                      icon={<MessageSquare className="w-3.5 h-3.5 text-cyan-400" />}
                    >
                      Open Private Thread
                    </Button>

                    {proj.stagingUrl && (
                      <a
                        href={proj.stagingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                      >
                        <span>Staging Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Milestones & Approvals */}
      {activeTab === 'milestones' && activeProject && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div>
              Project: <strong className="text-white font-display">{activeProject.title}</strong>
            </div>
            <span className="text-cyan-400 font-mono">{activeProject.milestones.length} Defined Milestones</span>
          </div>

          <div className="space-y-4">
            {activeProject.milestones.map((milestone, idx) => (
              <div
                key={milestone.id}
                className={`p-6 rounded-2xl border transition-all ${
                  milestone.status === 'approved'
                    ? 'bg-slate-900/40 border-emerald-500/30'
                    : milestone.status === 'ready_for_approval'
                    ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 font-bold">{idx + 1}.</span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                        milestone.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : milestone.status === 'ready_for_approval'
                          ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                          : milestone.status === 'in_progress'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {milestone.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Due: {milestone.dueDate}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-white">{milestone.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{milestone.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-bold font-mono text-cyan-400">{formatNaira(milestone.amountNGN)}</div>
                    <div className="text-[11px] text-slate-400">{milestone.percentage}% of contract</div>
                  </div>
                </div>

                {/* Milestone Actions for Customer */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    {milestone.status === 'approved' ? (
                      <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Signed off on {formatDate(milestone.approvedAt || '')}</span>
                      </span>
                    ) : milestone.status === 'ready_for_approval' ? (
                      <span className="text-cyan-300">Development complete · Ready for your sign-off</span>
                    ) : (
                      <span>In active development phase</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      actionName={`Request Revision: ${milestone.title}`}
                      onClick={() => handleOpenRevisionModal(milestone)}
                    >
                      Request Revision
                    </Button>

                    {milestone.status === 'ready_for_approval' && (
                      <Button
                        size="sm"
                        variant="primary"
                        actionName={`Approve Milestone: ${milestone.title}`}
                        onClick={() => handleApproveMilestone(milestone.id)}
                        icon={<CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                      >
                        Approve & Sign Off
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Invoices & Paystack Payments */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myInvoices.map(invoice => {
              const isPaid = invoice.status === 'paid';
              const isProcessing = paymentProcessingId === invoice.id;

              return (
                <div
                  key={invoice.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                    isPaid ? 'bg-slate-900/60 border-emerald-500/30' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold">{invoice.invoiceNumber}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                        isPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-display text-white">{invoice.description}</h4>
                    <div className="text-xs text-slate-400">Project: {invoice.projectTitle}</div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                      {invoice.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-slate-300">
                          <span className="truncate max-w-[200px]">{item.description}</span>
                          <span className="font-mono">{formatNaira(item.amountNGN)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-xs text-slate-400">Total Due:</span>
                      <span className="text-2xl font-bold font-mono text-white">{formatNaira(invoice.amountNGN)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setViewingReceiptInvoice(invoice)}
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Receipt / PDF</span>
                    </button>

                    {!isPaid && (
                      <Button
                        size="sm"
                        variant="primary"
                        actionName={`Pay Invoice ${invoice.invoiceNumber}`}
                        disabled={isProcessing}
                        onClick={() => handlePayInvoice(invoice)}
                        icon={<CreditCard className="w-3.5 h-3.5 text-slate-950" />}
                      >
                        {isProcessing ? 'Verifying with Paystack...' : `Pay ${formatNaira(invoice.amountNGN)} via Paystack`}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Messages Thread */}
      {activeTab === 'messages' && activeProject && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Direct Thread: </span>
              <strong className="text-white">{activeProject.title}</strong>
            </div>
            <span className="text-emerald-400 font-mono">Jephthah Ozero (Studio Owner) Active</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {myMessages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No messages yet. Send a message below to coordinate directly with Jephthah Ozero.
              </div>
            ) : (
              myMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-slate-200">{msg.senderName}</span>
                      <span>·</span>
                      <span>{formatDate(msg.createdAt)}</span>
                    </div>
                    <div className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                      isMe
                        ? 'bg-cyan-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
            <input
              type="text"
              placeholder="Type message or technical question to Jephthah..."
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <Button size="sm" variant="primary" type="submit" actionName="Send Project Message" icon={<Send className="w-3.5 h-3.5" />}>
              Send
            </Button>
          </form>
        </div>
      )}

      {/* Tab 5: Deliverables & Files */}
      {activeTab === 'deliverables' && activeProject && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeProject.deliverables.map(deliv => (
              <div key={deliv.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white font-display">{deliv.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400">{deliv.description}</p>
                  <div className="text-[11px] text-slate-500 font-mono pt-1">
                    {deliv.fileType} · {deliv.fileSize} · Uploaded {formatDate(deliv.uploadedAt)}
                  </div>
                </div>

                <a
                  href={deliv.downloadUrl}
                  onClick={() => logAction('Download Deliverable Clicked', { title: deliv.title })}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 transition-colors shrink-0"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revision Request Modal */}
      <Modal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        title="Submit Revision Request"
        subtitle="Specify adjustments, feedback, or scope refinements for this milestone"
        maxWidth="md"
      >
        <form onSubmit={handleSubmitRevision} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Revision Subject</label>
            <input
              type="text"
              value={revTitle}
              onChange={e => setRevTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Priority Level</label>
            <select
              value={revPriority}
              onChange={e => setRevPriority(e.target.value as RevisionPriority)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              <option value="low">Low - Polish / Styling</option>
              <option value="medium">Medium - Standard Iteration</option>
              <option value="high">High - Essential Functionality</option>
              <option value="urgent">Urgent - Blocking Workflow</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">Revision Details & Feedback</label>
            <textarea
              rows={4}
              value={revDesc}
              onChange={e => setRevDesc(e.target.value)}
              placeholder="Describe the exact changes, screens, or behaviors you would like refined..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          <Button size="md" variant="primary" type="submit" actionName="Submit Revision" className="w-full mt-2">
            Submit Revision Request to Studio
          </Button>
        </form>
      </Modal>

      {/* Invoice Receipt Modal */}
      {viewingReceiptInvoice && (
        <Modal
          isOpen={!!viewingReceiptInvoice}
          onClose={() => setViewingReceiptInvoice(null)}
          title={`Official Invoice Receipt · ${viewingReceiptInvoice.invoiceNumber}`}
          subtitle="Ozero Digital Studio Commercial Transaction Record"
          maxWidth="2xl"
        >
          <div className="space-y-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-white">{config.ownerName}</h3>
                <div>Ozero Digital Studio</div>
                <div className="font-mono text-slate-400">{config.ownerEmail}</div>
                <div className="text-slate-400">{config.location}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-cyan-400 font-bold text-sm">{viewingReceiptInvoice.invoiceNumber}</div>
                <div>Date: {formatDate(viewingReceiptInvoice.createdAt)}</div>
                <div className={`font-mono font-bold uppercase mt-1 ${viewingReceiptInvoice.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  Status: {viewingReceiptInvoice.status}
                </div>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-1">Billed To:</span>
              <div className="font-bold text-white text-sm">{viewingReceiptInvoice.customerName}</div>
              {viewingReceiptInvoice.customerCompany && <div>{viewingReceiptInvoice.customerCompany}</div>}
              <div className="font-mono">{viewingReceiptInvoice.customerEmail}</div>
            </div>

            <table className="w-full text-left divide-y divide-slate-800">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {viewingReceiptInvoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 text-slate-200">{item.description}</td>
                    <td className="py-2 text-right font-mono font-bold text-white">{formatNaira(item.amountNGN)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold">
              <span>Total Amount:</span>
              <span className="font-mono text-cyan-400">{formatNaira(viewingReceiptInvoice.amountNGN)}</span>
            </div>

            {viewingReceiptInvoice.paymentReference && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-[11px]">
                Verified Paystack Reference: {viewingReceiptInvoice.paymentReference} (Paid on {formatDate(viewingReceiptInvoice.paidAt || '')})
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <Button
                size="sm"
                variant="secondary"
                actionName="Print Receipt"
                onClick={() => window.print()}
                icon={<Printer className="w-3.5 h-3.5" />}
              >
                Print / Save PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
