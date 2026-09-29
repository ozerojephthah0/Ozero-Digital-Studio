/**
 * Currency and date formatting helpers
 */

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};

export const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  // Strip non-digits except leading +
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMsg}`;
};

export const generateEnquiryWhatsAppMessage = (
  customerName: string,
  category: string,
  budget: number,
  description: string
): string => {
  return `Hello Jephthah! My name is ${customerName}. I would like to discuss a project with Ozero Digital Studio.
Category: ${category}
Estimated Budget: ${formatNaira(budget)}
Details: ${description.slice(0, 180)}${description.length > 180 ? '...' : ''}`;
};
