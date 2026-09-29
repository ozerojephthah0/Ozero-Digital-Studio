/**
 * Universal Action Logger
 * Logs user interaction events, button clicks, and system diagnostics with clean console tags.
 */
export const logAction = (actionName: string, payload?: Record<string, unknown> | string | number | boolean | null) => {
  const timestamp = new Date().toLocaleTimeString();
  if (payload !== undefined && payload !== null) {
    console.log(`%c[Ozero Studio · ${timestamp}] %c▶ ${actionName}`, 'color: #38bdf8; font-weight: bold;', 'color: #e2e8f0;', payload);
  } else {
    console.log(`%c[Ozero Studio · ${timestamp}] %c▶ ${actionName}`, 'color: #38bdf8; font-weight: bold;', 'color: #e2e8f0;');
  }
};

export const logAdminEvent = (event: string, details?: unknown) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`%c[Ozero Admin · ${timestamp}] %c🔒 ${event}`, 'color: #a855f7; font-weight: bold;', 'color: #f1f5f9;', details || '');
};
