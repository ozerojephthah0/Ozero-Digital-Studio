import React, { useState } from 'react';
import {
  Inbox,
  Briefcase,
  Layers,
  Settings,
  Terminal,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  MessageSquare,
  Mail,
  Download,
  Filter,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Users,
  FolderKanban,
  FileText,
  BarChart3,
  CreditCard,
  Building,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { formatNaira, formatDate, createWhatsAppUrl } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { TestSuiteRunner } from './TestSuiteRunner';
import { EnquiryStatus, ServiceItem, ProjectItem, PricingPackage, ClientProject, Invoice, User } from '../../types';
import { logAction, logAdminEvent } from '../../utils/logger';

export const AdminDashboard: React.FC = () => {
  const {
    config,
    updateConfig,
    services,
    updateService,
    projects,
    updateProject,
    addProject,
    packages,
    updatePackage,
    enquiries,
    updateEnquiryStatus,
    updateEnquiryNotes,
    deleteEnquiry,
    clientProjects,
    createClientProject,
    invoices,
    createInvoice,
    markInvoicePaidManual,
    registeredUsers,
    messages,
    sendMessage,
    auditLogs,
    logout,
    navigateTo
  } = useStudio();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'invoices' | 'enquiries' | 'customers' | 'services' | 'packages' | 'settings' | 'audit' | 'tests'
  >('overview');

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);

  // New Client Project Modal State
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projCustEmail, setProjCustEmail] = useState('');
  const [projCustName, setProjCustName] = useState('');
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('Web Application Development');
  const [projBudget, setProjBudget] = useState<number>(650000);
  const [projStartDate, setProjStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [projTargetDate, setProjTargetDate] = useState(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);

  // New Invoice Modal State
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
  const [invProjId, setInvProjId] = useState('');
  const [invCustName, setInvCustName] = useState('');
  const [invCustEmail, setInvCustEmail] = useState('');
  const [invAmount, setInvAmount] = useState<number>(350000);
  const [invDesc, setInvDesc] = useState('');
  const [invDueDate, setInvDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);

  // Service Edit States
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [servicePriceEdit, setServicePriceEdit] = useState<number>(0);
  const [serviceTimelineEdit, setServiceTimelineEdit] = useState<string>('');

  // Packages Edit States
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packagePriceEdit, setPackagePriceEdit] = useState<number>(0);
  const [packageTimelineEdit, setPackageTimelineEdit] = useState<string>('');

  // Selected Enquiry
  const filteredEnquiries = enquiries.filter(e => {
    if (statusFilter === 'all') return true;
    return e.status === statusFilter;
  });
  const selectedEnquiry = enquiries.find(e => e.id === selectedEnquiryId) || filteredEnquiries[0] || null;

  // Overview Metrics Calculations
  const totalRevenuePaid = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amountNGN, 0);

  const totalRevenuePending = invoices
    .filter(i => i.status === 'pending')
    .reduce((sum, i) => sum + i.amountNGN, 0);

  const activeProjectsCount = clientProjects.filter(p => p.status !== 'completed').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;

  const handleExportCSV = () => {
    logAction('Admin: Export Enquiries CSV');
    const headers = ['ID', 'Customer Name', 'Email', 'Phone', 'Category', 'Budget (NGN)', 'Created Date', 'Status', 'Description'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.customerName.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phoneOrWhatsapp || ''}"`,
      `"${e.projectCategory}"`,
      e.estimatedBudgetNGN,
      e.createdAt,
      e.status,
      `"${e.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ozero_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projCustEmail || !projTitle) return;

    createClientProject({
      customerId: `usr-${Date.now()}`,
      customerName: projCustName || projCustEmail.split('@')[0],
      customerEmail: projCustEmail,
      title: projTitle,
      serviceCategory: projCategory,
      status: 'in_development',
      startDate: projStartDate,
      targetDate: projTargetDate,
      budgetNGN: projBudget,
      totalPaidNGN: 0,
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Milestone 1: Discovery & System Architecture',
          description: 'Technical specs, schema blueprints, and UI component wireframes.',
          percentage: 30,
          amountNGN: Math.round(projBudget * 0.3),
          status: 'in_progress',
          dueDate: projStartDate
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Milestone 2: Frontend & Backend Engineering',
          description: 'React application development, Paystack integration, and database synchronization.',
          percentage: 40,
          amountNGN: Math.round(projBudget * 0.4),
          status: 'pending',
          dueDate: projTargetDate
        },
        {
          id: `m-${Date.now()}-3`,
          title: 'Milestone 3: Security Hardening & Launch Deployment',
          description: 'Performance tuning, Core Web Vitals optimization, and domain handoff.',
          percentage: 30,
          amountNGN: Math.round(projBudget * 0.3),
          status: 'pending',
          dueDate: projTargetDate
        }
      ]
    });

    setIsNewProjectModalOpen(false);
    setProjTitle('');
    setProjCustEmail('');
    setProjCustName('');
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invCustEmail || !invAmount) return;

    const proj = clientProjects.find(p => p.id === invProjId) || clientProjects[0];

    createInvoice({
      invoiceNumber: `OZERO-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      projectId: proj ? proj.id : 'proj-general',
      projectTitle: proj ? proj.title : 'Custom Digital Engineering',
      customerId: proj ? proj.customerId : 'usr-general',
      customerName: invCustName || (proj ? proj.customerName : 'Client'),
      customerEmail: invCustEmail,
      amountNGN: invAmount,
      description: invDesc || 'Project Milestone Fee',
      items: [{ description: invDesc || 'Digital Engineering & Milestone Deliverables', amountNGN: invAmount }],
      dueDate: invDueDate
    });

    setIsNewInvoiceModalOpen(false);
    setInvCustEmail('');
    setInvDesc('');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Top Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Studio Owner Command Console</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-mono">Jephthah Ozero</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Ozero Digital Studio Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            actionName="Admin: View Live Site"
            onClick={() => navigateTo('home')}
            iconRight={<ExternalLink className="w-3.5 h-3.5" />}
          >
            Live Site
          </Button>

          <Button
            size="sm"
            variant="danger"
            actionName="Admin Sign Out"
            onClick={logout}
            icon={<LogOut className="w-3.5 h-3.5" />}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Overview Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Client Projects ({clientProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Invoices & Paystack ({invoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'enquiries'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'customers'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customers CRM ({registeredUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Services Pricing</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Studio Config</span>
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'tests'
              ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Test Suite</span>
        </button>
      </div>

      {/* Tab: Overview Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Settled Revenue (Paystack & Bank)</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">{formatNaira(totalRevenuePaid)}</div>
              <div className="text-[11px] text-slate-500 font-mono">Paid across all invoices</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Pending Milestone Invoices</div>
              <div className="text-2xl font-bold font-mono text-amber-400">{formatNaira(totalRevenuePending)}</div>
              <div className="text-[11px] text-slate-500 font-mono">Awaiting client payment</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Active Client Projects</div>
              <div className="text-2xl font-bold font-mono text-cyan-400">{activeProjectsCount}</div>
              <div className="text-[11px] text-slate-500 font-mono">In active development / review</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">New Inbound Enquiries</div>
              <div className="text-2xl font-bold font-mono text-white">{newEnquiriesCount}</div>
              <div className="text-[11px] text-slate-500 font-mono">Requires quote response</div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold font-display text-white">Owner Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                variant="primary"
                actionName="Admin: Open New Project Modal"
                onClick={() => setIsNewProjectModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Create New Client Project
              </Button>

              <Button
                size="sm"
                variant="outline"
                actionName="Admin: Open New Invoice Modal"
                onClick={() => setIsNewInvoiceModalOpen(true)}
                icon={<DollarSign className="w-4 h-4 text-cyan-400" />}
              >
                Issue Milestone Invoice
              </Button>

              <Button
                size="sm"
                variant="secondary"
                actionName="Admin: Export CSV"
                onClick={handleExportCSV}
                icon={<Download className="w-4 h-4" />}
              >
                Export All Inbound Enquiries CSV
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Client Projects Management */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-display text-white">Active Client Engagements</h3>
            <Button
              size="sm"
              variant="primary"
              actionName="Admin: Create Client Project"
              onClick={() => setIsNewProjectModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Client Project
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {clientProjects.map(proj => (
              <div key={proj.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-cyan-400 font-bold uppercase">{proj.serviceCategory}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-amber-400 uppercase font-semibold">{proj.status.replace('_', ' ')}</span>
                    </div>
                    <h4 className="text-lg font-bold font-display text-white mt-1">{proj.title}</h4>
                    <div className="text-xs text-slate-400 font-mono">
                      Client: {proj.customerName} ({proj.customerEmail})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Contract Value</div>
                    <div className="text-xl font-bold font-mono text-white">{formatNaira(proj.budgetNGN)}</div>
                    <div className="text-xs text-emerald-400 font-mono">Paid: {formatNaira(proj.totalPaidNGN)}</div>
                  </div>
                </div>

                {/* Milestones status */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project Milestones</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                    {proj.milestones.map((m, i) => (
                      <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className="text-slate-500">M{i + 1}</span>
                          <span className={`font-bold ${m.status === 'approved' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {m.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="font-bold text-slate-200 truncate">{m.title}</div>
                        <div className="text-[11px] text-cyan-400 font-mono">{formatNaira(m.amountNGN)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Invoices Management */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-display text-white">Commercial Invoices & Paystack Records</h3>
            <Button
              size="sm"
              variant="primary"
              actionName="Admin: Create Invoice"
              onClick={() => setIsNewInvoiceModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Generate New Invoice
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invoices.map(inv => (
              <div key={inv.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-cyan-400 text-sm">{inv.invoiceNumber}</span>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold uppercase text-[10px] ${
                      inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{inv.description}</h4>
                  <div className="text-slate-400">Client: {inv.customerName} ({inv.customerEmail})</div>
                  <div className="text-xl font-bold font-mono text-white pt-1">{formatNaira(inv.amountNGN)}</div>

                  {inv.paymentReference && (
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
                      Paystack Ref: {inv.paymentReference}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Due: {inv.dueDate}</span>
                  {inv.status !== 'paid' && (
                    <Button
                      size="sm"
                      variant="outline"
                      actionName={`Mark Paid: ${inv.invoiceNumber}`}
                      onClick={() => markInvoicePaidManual(inv.id)}
                    >
                      Mark Paid (Manual / Transfer)
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto w-full sm:w-auto">
              {['all', 'new', 'in_review', 'in_progress', 'completed', 'archived'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs rounded-lg uppercase tracking-wider font-semibold transition-colors ${
                    statusFilter === st
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              variant="outline"
              actionName="Export Enquiries CSV"
              onClick={handleExportCSV}
              icon={<Download className="w-3.5 h-3.5 text-cyan-400" />}
            >
              Export CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List */}
            <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto">
              {filteredEnquiries.map(enq => (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiryId(enq.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedEnquiry?.id === enq.id
                      ? 'bg-slate-900 border-cyan-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate max-w-[180px]">
                      {enq.customerName}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                      enq.status === 'new' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 truncate">{enq.projectCategory}</div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-2 mt-2 border-t border-slate-800/60">
                    <span>{formatDate(enq.createdAt)}</span>
                    <span className="font-mono text-slate-300 font-bold">{formatNaira(enq.estimatedBudgetNGN)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Pane */}
            <div className="lg:col-span-7">
              {selectedEnquiry && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">{selectedEnquiry.customerName}</h3>
                      <div className="text-xs text-cyan-400 font-mono mt-0.5">{selectedEnquiry.email}</div>
                    </div>

                    <select
                      value={selectedEnquiry.status}
                      onChange={e => updateEnquiryStatus(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-cyan-300"
                    >
                      <option value="new">Status: New</option>
                      <option value="in_review">Status: In Review</option>
                      <option value="in_progress">Status: In Progress</option>
                      <option value="completed">Status: Completed</option>
                      <option value="archived">Status: Archived</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap">
                    {selectedEnquiry.description}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="primary"
                      actionName="Reply on WhatsApp"
                      onClick={() => {
                        const target = selectedEnquiry.phoneOrWhatsapp || config.whatsappNumber;
                        const msg = `Hello ${selectedEnquiry.customerName}, this is Jephthah Ozero from Ozero Digital Studio. I have reviewed your "${selectedEnquiry.projectCategory}" project scope.`;
                        window.open(createWhatsAppUrl(target, msg), '_blank', 'noopener,noreferrer');
                      }}
                      icon={<MessageSquare className="w-4 h-4 text-emerald-950" />}
                    >
                      Reply on WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Customer CRM */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registeredUsers.map(u => (
              <div key={u.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-white text-sm">{u.name}</span>
                  <span className="font-mono text-cyan-400 font-bold uppercase">{u.role}</span>
                </div>
                <div className="text-slate-400 font-mono">{u.email}</div>
                {u.company && <div className="text-slate-300">Company: {u.company}</div>}
                <div className="text-slate-500 font-mono">Member since {formatDate(u.createdAt)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Services & Pricing Editor */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(srv => {
            const isEditing = editingServiceId === srv.id;
            return (
              <div key={srv.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                  <button
                    onClick={() => updateService(srv.id, { isActive: !srv.isActive })}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      srv.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {srv.isActive ? 'Active' : 'Hidden'}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-2 p-3 bg-slate-950 rounded-lg text-xs">
                    <input
                      type="number"
                      value={servicePriceEdit}
                      onChange={e => setServicePriceEdit(Number(e.target.value))}
                      className="w-full px-2 py-1 rounded bg-slate-900 text-cyan-300 font-mono"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          updateService(srv.id, { startingPriceNGN: servicePriceEdit });
                          setEditingServiceId(null);
                        }}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditingServiceId(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-cyan-400 font-bold">{formatNaira(srv.startingPriceNGN)}</span>
                    <button
                      onClick={() => {
                        setEditingServiceId(srv.id);
                        setServicePriceEdit(srv.startingPriceNGN);
                      }}
                      className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Studio Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <h3 className="text-base font-bold font-display text-white">Studio Configurations</h3>
          <div className="space-y-3">
            <div>
              <label className="text-slate-300 block mb-1">Owner Name</label>
              <input
                type="text"
                value={config.ownerName}
                onChange={e => updateConfig({ ownerName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Owner Email</label>
              <input
                type="email"
                value={config.ownerEmail}
                onChange={e => updateConfig({ ownerEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">WhatsApp Phone Number</label>
              <input
                type="text"
                value={config.whatsappNumber}
                onChange={e => updateConfig({ whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Notice Banner</label>
              <input
                type="text"
                value={config.announcementNotice}
                onChange={e => updateConfig({ announcementNotice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Automated Test Suite */}
      {activeTab === 'tests' && <TestSuiteRunner />}

      {/* New Client Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Initialize New Client Project"
        subtitle="Set up project milestone contract and client access"
        maxWidth="md"
      >
        <form onSubmit={handleCreateProjectSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 block mb-1">Client Email *</label>
            <input
              type="email"
              placeholder="client@company.com"
              value={projCustEmail}
              onChange={e => setProjCustEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Client Full Name</label>
            <input
              type="text"
              placeholder="e.g. Alex Adebayo"
              value={projCustName}
              onChange={e => setProjCustName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Project Title *</label>
            <input
              type="text"
              placeholder="e.g. Mobile E-commerce Web App"
              value={projTitle}
              onChange={e => setProjTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Contract Budget (NGN ₦) *</label>
            <input
              type="number"
              value={projBudget}
              onChange={e => setProjBudget(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              required
            />
          </div>

          <Button size="md" variant="primary" type="submit" actionName="Create Client Project" className="w-full mt-2">
            Create Project & Generate Milestones
          </Button>
        </form>
      </Modal>

      {/* New Invoice Modal */}
      <Modal
        isOpen={isNewInvoiceModalOpen}
        onClose={() => setIsNewInvoiceModalOpen(false)}
        title="Issue Milestone Invoice"
        subtitle="Generate Paystack-ready commercial invoice"
        maxWidth="md"
      >
        <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 block mb-1">Client Email *</label>
            <input
              type="email"
              value={invCustEmail}
              onChange={e => setInvCustEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Invoice Description *</label>
            <input
              type="text"
              placeholder="e.g. Milestone 1: UX Architecture & Wireframes Deposit"
              value={invDesc}
              onChange={e => setInvDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Amount Due (NGN ₦) *</label>
            <input
              type="number"
              value={invAmount}
              onChange={e => setInvAmount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              required
            />
          </div>

          <Button size="md" variant="primary" type="submit" actionName="Issue Invoice" className="w-full mt-2">
            Issue Invoice to Client Portal
          </Button>
        </form>
      </Modal>
    </div>
  );
};
