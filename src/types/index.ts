export type ProjectStatus = 'completed' | 'in_development' | 'prototype';

export type ServiceCategory =
  | 'business_website'
  | 'ecommerce'
  | 'web_application'
  | 'redesign_mobile'
  | 'bugfix_maintenance'
  | 'security_review'
  | 'landing_portfolio'
  | 'ui_ux_design'
  | 'custom_solution'
  | 'custom_development';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  startingPriceNGN: number;
  estimatedDelivery: string;
  idealFor: string;
  iconName: string;
  isActive: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  story: string;
  category: 'ecommerce' | 'audio_tool' | 'content_app' | 'game' | 'fintech' | 'custom';
  status: ProjectStatus;
  technologies: string[];
  features: string[];
  imagePath: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  year: string;
  highlights: string[];
}

export interface PricingPackage {
  id: string;
  name: 'Starter' | 'Business' | 'Custom Project';
  badge?: string;
  description: string;
  priceNGN: number;
  isStartingPrice?: boolean;
  deliveryTimeline: string;
  revisions: string;
  targetAudience: string;
  features: string[];
  isPopular?: boolean;
}

export type EnquiryStatus = 'new' | 'in_review' | 'in_progress' | 'completed' | 'archived' | 'rejected';

export interface ProjectEnquiry {
  id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  phoneOrWhatsapp?: string;
  projectCategory: string;
  serviceId?: string;
  packageId?: string;
  description: string;
  estimatedBudgetNGN: number;
  preferredCompletionDate: string;
  referenceWebsite?: string;
  attachmentName?: string;
  attachmentSize?: string;
  referralCode?: string;
  discountAppliedPercentage?: number;
  createdAt: string;
  status: EnquiryStatus;
  adminNotes?: string;
}

export interface StudioConfig {
  ownerName: string;
  ownerTitle: string;
  ownerEmail: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  location: string;
  currency: string;
  announcementNotice: string;
  githubProfile: string;
  linkedinProfile: string;
  bioSummary: string;
  paystackPublicKey?: string;
}

export interface TestResult {
  id: string;
  name: string;
  category: 'Auth' | 'Enquiry' | 'Services' | 'Portfolio' | 'Pricing' | 'Security' | 'Payments' | 'Milestones' | 'Support';
  status: 'passed' | 'failed' | 'running';
  durationMs: number;
  message: string;
  timestamp: string;
}

// ----------------------------------------------------
// Production Digital Agency Extended Data Models
// ----------------------------------------------------

export type UserRole = 'customer' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  phone?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  notifyUpdates?: boolean;
  notifyInvoices?: boolean;
  notifyMarketing?: boolean;
  createdAt: string;
}

export type MilestoneStatus = 'pending' | 'in_progress' | 'ready_for_approval' | 'approved';

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  percentage: number;
  amountNGN: number;
  status: MilestoneStatus;
  dueDate: string;
  approvedAt?: string;
}

export type RevisionPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RevisionStatus = 'submitted' | 'under_review' | 'implemented' | 'rejected';

export interface RevisionRequest {
  id: string;
  milestoneId: string;
  milestoneTitle: string;
  title: string;
  description: string;
  priority: RevisionPriority;
  status: RevisionStatus;
  createdAt: string;
  responseNotes?: string;
  attachmentName?: string;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  uploadedAt: string;
  description: string;
}

export type ClientProjectStatus = 'discovery' | 'in_development' | 'review' | 'completed' | 'on_hold';

export interface ClientProject {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  title: string;
  serviceCategory: string;
  status: ClientProjectStatus;
  startDate: string;
  targetDate: string;
  budgetNGN: number;
  totalPaidNGN: number;
  milestones: ProjectMilestone[];
  revisions: RevisionRequest[];
  deliverables: ProjectDeliverable[];
  repositoryUrl?: string;
  stagingUrl?: string;
  liveUrl?: string;
  updatedAt: string;
}

export interface ProjectMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  createdAt: string;
  attachmentName?: string;
}

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'cancelled';
export type PaymentMethod = 'paystack' | 'bank_transfer' | 'manual';

export interface InvoiceItem {
  description: string;
  amountNGN: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectTitle: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  amountNGN: number;
  description: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
  paidAt?: string;
  paymentReference?: string;
  paymentMethod?: PaymentMethod;
}

export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number; // in Kobo
    currency: string;
    paid_at: string;
    channel: string;
    customer: {
      email: string;
    };
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userEmail?: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phoneOrWhatsapp: string;
  topic: string;
  preferredTime: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface AIAdvisorResponse {
  recommendation: string;
  recommendedArchitecture: string[];
  suggestedMilestones: { title: string; duration: string; focus: string }[];
  estimatedBudgetRangeNGN: { min: number; max: number };
  estimatedTurnaroundWeeks: number;
  securityCheckpoints: string[];
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface SupportTicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  projectId?: string;
  subject: string;
  category: 'technical' | 'billing' | 'revision' | 'general';
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: SupportTicketMessage[];
}

export interface ReferralCode {
  code: string;
  discountPercentage: number;
  affiliateName: string;
  usesCount: number;
  totalGeneratedNGN: number;
  active: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}
