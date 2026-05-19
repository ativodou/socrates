let container = null;

function getContainer() {
  if (!container || !document.body.contains(container)) {
    container = document.createElement('div');
    container.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99999;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none;';
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message, type = 'info') {
  const colors = { success: '#16a34a', error: '#dc2626', info: '#1d4ed8', warning: '#d97706' };
  const icons  = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  const el = document.createElement('div');
  el.style.cssText = `background:${colors[type]||colors.info};color:#fff;padding:10px 20px;border-radius:10px;font-size:14px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,0.3);max-width:340px;text-align:center;pointer-events:auto;opacity:1;transition:opacity 0.3s ease;`;
  el.textContent = `${icons[type]||''} ${message}`;
  getContainer().appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; }, 2700);
  setTimeout(() => { el.remove(); }, 3000);
}

export const toast = {
  success: (msg) => showToast(msg, 'success'),
  error:   (msg) => showToast(msg, 'error'),
  info:    (msg) => showToast(msg, 'info'),
  warning: (msg) => showToast(msg, 'warning'),
};
