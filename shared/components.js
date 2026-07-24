/* ============================================================
   Pearl CX Prototype — Shared Components
   Phone shell, drawer, bottom sheet system, charts, navigation
   ============================================================ */

/* ----- Navigation state ----- */
const NAV = {
  history: [],
  currentScreen: null,
  currentParams: {},
};

/* ----- Navigate forward ----- */
function navigate(screenFn, params = {}) {
  if (NAV.currentScreen) {
    NAV.history.push({ fn: NAV.currentScreen, params: NAV.currentParams });
  }
  NAV.currentScreen = screenFn;
  NAV.currentParams = params;
  _renderWithTransition(screenFn, params, 'forward');
}

/* ----- Navigate back ----- */
function goBack() {
  if (NAV.history.length) {
    const prev = NAV.history.pop();
    NAV.currentScreen = prev.fn;
    NAV.currentParams = prev.params;
    _renderWithTransition(prev.fn, prev.params, 'back');
    return;
  }
  // Each screen is its own page load, so there's usually no in-page
  // history — fall back to the browser history, then Dashboard.
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'dashboard.html';
  }
}

function _renderWithTransition(screenFn, params, direction) {
  const screenEl = document.getElementById('screen');
  if (!screenEl) return;

  const outClass = direction === 'forward' ? 'screen-exit' : 'screen-back-exit';
  const inClass  = direction === 'forward' ? 'screen-enter' : 'screen-back-enter';

  // Snapshot current content for exit animation
  const snapshot = document.createElement('div');
  snapshot.style.cssText = 'position:absolute;inset:0;z-index:1;background:#fff;pointer-events:none;';
  snapshot.innerHTML = screenEl.innerHTML;
  snapshot.classList.add(outClass);
  screenEl.appendChild(snapshot);
  setTimeout(() => snapshot.remove(), 250);

  // Render new content
  screenEl.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;';
  wrapper.innerHTML = screenFn(params);
  wrapper.classList.add(inClass);
  screenEl.appendChild(wrapper);
  setTimeout(() => wrapper.classList.remove(inClass), 250);
}

/* ----- Phone shell ----- */
const _BOTTOM_NAV_TABS = ['dashboard', 'closedloop', 'account'];

function renderPhoneShell(screenHTML, activeTab = '', opts = {}) {
  const showStatusBar = opts.hideStatusBar !== true;
  const showHomeIndicator = opts.hideHomeIndicator !== true;
  const showBottomNav = opts.hideBottomNav !== true && _BOTTOM_NAV_TABS.includes(activeTab);
  return `
    <div class="device-shell">
      ${showStatusBar ? `
      <div class="status-bar">
        <span>9:41</span>
        <div class="status-bar-icons">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
            <rect x="4" y="2" width="3" height="10" rx="1" opacity="0.6"/>
            <rect x="8" y="1" width="3" height="11" rx="1" opacity="0.8"/>
            <rect x="12" y="0" width="3" height="12" rx="1"/>
          </svg>
          <span style="font-size:11px;font-weight:700;">5G</span>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.35"/>
            <rect x="22" y="4" width="3" height="4" rx="1" opacity="0.35"/>
            <rect x="1" y="2" width="16" height="8" rx="1"/>
          </svg>
        </div>
      </div>` : ''}
      <div id="screen" style="flex:1;position:relative;overflow:hidden;display:flex;flex-direction:column;">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;">
          ${screenHTML}
        </div>
      </div>
      ${showBottomNav ? renderBottomNav(activeTab) : ''}
      ${showHomeIndicator ? '<div class="home-indicator"></div>' : ''}
    </div>
  `;
}

/* ----- Bottom navigation ----- */
const _NAV_DASHBOARD_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="8" height="8" rx="2"/>
  <rect x="13" y="3" width="8" height="8" rx="2"/>
  <rect x="3" y="13" width="8" height="8" rx="2"/>
  <rect x="13" y="13" width="8" height="8" rx="2"/>
</svg>`;

const _NAV_CLOSEDLOOP_ICON = `<svg width="22" height="22" viewBox="0 0 16 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00003 6.30622C7.00434 6.30622 6.19718 7.11339 6.19718 8.10908C6.19718 8.54287 6.34995 8.93988 6.6046 9.24995L6.84339 9.5407L6.53003 9.74892C5.90146 10.1666 5.46139 10.8433 5.36155 11.6262H10.6385C10.5387 10.8433 10.0986 10.1668 9.4702 9.74986L9.15678 9.54191L9.39521 9.25101C9.65016 8.93996 9.80289 8.54281 9.80289 8.10908C9.80289 7.11339 8.99572 6.30622 8.00003 6.30622ZM5.51718 8.10908C5.51718 6.73783 6.62879 5.62622 8.00003 5.62622C9.37128 5.62622 10.4829 6.73783 10.4829 8.10908C10.4829 8.57792 10.3527 9.0169 10.1266 9.3912C10.8673 10.0029 11.34 10.9294 11.34 11.9662V12.3062H4.66003V11.9662C4.66003 10.9293 5.13278 10.0029 5.87337 9.39069C5.64731 9.01671 5.51718 8.57775 5.51718 8.10908Z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.58179 3.88667C8.23465 3.46715 6.77603 3.59997 5.52681 4.2559C4.2776 4.91183 3.34012 6.03715 2.9206 7.38429C2.50109 8.73143 2.63391 10.1901 3.28984 11.4393C3.94577 12.6885 5.07108 13.626 6.41822 14.0455C7.76537 14.465 9.22399 14.3322 10.4732 13.6762C11.7224 13.0203 12.6599 11.895 13.0794 10.5479C13.4989 9.20071 13.3661 7.7421 12.7102 6.49288C12.0542 5.24366 10.9289 4.30618 9.58179 3.88667ZM5.21069 3.65385C6.61958 2.91408 8.26464 2.76428 9.78397 3.23742C11.3033 3.71056 12.5725 4.76787 13.3122 6.17676C14.052 7.58565 14.2018 9.23071 13.7287 10.75C13.2555 12.2694 12.1982 13.5385 10.7893 14.2783C9.38043 15.0181 7.73538 15.1679 6.21604 14.6947C4.69671 14.2216 3.42756 13.1643 2.68778 11.7554C1.94801 10.3465 1.79822 8.70144 2.27136 7.18211C2.74449 5.66277 3.8018 4.39362 5.21069 3.65385Z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4201 1.65813C6.93434 1.57272 5.45785 1.94221 4.18744 2.71733C2.91702 3.49245 1.91305 4.63639 1.30935 5.99665C0.705641 7.3569 0.530888 8.86886 0.808382 10.331C1.08588 11.7931 1.80243 13.1359 2.86253 14.1804C3.92264 15.2248 5.27592 15.9214 6.74198 16.1772C8.20805 16.4329 9.71724 16.2357 11.0684 15.6119C12.4195 14.9881 13.5485 13.9673 14.3046 12.6855C15.0608 11.4037 15.4083 9.92189 15.3009 8.43757C15.2873 8.25028 15.4282 8.08746 15.6155 8.07391C15.8028 8.06035 15.9656 8.20118 15.9791 8.38847C16.0966 10.0107 15.7167 11.6302 14.8903 13.031C14.0639 14.4318 12.8301 15.5475 11.3534 16.2293C9.87677 16.9111 8.22737 17.1266 6.62512 16.847C5.02286 16.5675 3.54386 15.8063 2.38528 14.6647C1.2267 13.5232 0.44358 12.0557 0.140308 10.4578C-0.162965 8.85983 0.0280221 7.20742 0.687808 5.7208C1.34759 4.23418 2.44483 2.98397 3.83326 2.13685C5.22169 1.28972 6.83535 0.885911 8.45912 0.979253C8.64659 0.99003 8.78983 1.15074 8.77905 1.33821C8.76827 1.52567 8.60757 1.66891 8.4201 1.65813Z"/>
  <path d="M13.5 4.71606C13.5 5.68256 12.7165 6.46606 11.75 6.46606C10.7835 6.46606 10 5.68256 10 4.71606C10 3.74957 10.7835 2.96606 11.75 2.96606C12.7165 2.96606 13.5 3.74957 13.5 4.71606Z"/>
</svg>`;

const _NAV_ACCOUNT_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="4"/>
  <path d="M4 20c0-4.2 3.6-7.2 8-7.2s8 3 8 7.2"/>
</svg>`;

function renderBottomNav(activeItem = '') {
  const navItems = [
    { key: 'dashboard',  label: 'Dashboard',  href: 'dashboard.html',   icon: _NAV_DASHBOARD_ICON },
    { key: 'closedloop', label: 'Closedloop', href: 'ticket-list.html', icon: _NAV_CLOSEDLOOP_ICON },
    { key: 'account',    label: 'Account',    href: 'account.html',    icon: _NAV_ACCOUNT_ICON },
  ];

  return `
    <nav class="bottom-nav">
      ${navItems.map(item => `
        <a class="bottom-nav-item${activeItem === item.key ? ' active' : ''}" href="${item.href}">
          <span class="bottom-nav-icon-bg"><span class="bottom-nav-icon">${item.icon}</span></span>
          <span class="bottom-nav-label">${item.label}</span>
        </a>
      `).join('')}
    </nav>
  `;
}

/* ----- Bottom sheet system ----- */
let _sheetStack = [];

function openSheet(id, contentHTML, titleHTML = '', onClose = null) {
  _sheetStack.push({ id, onClose });

  const overlay = document.createElement('div');
  overlay.className = 'sheet-overlay';
  overlay.id = `sheet-${id}`;
  overlay.innerHTML = `
    <div class="sheet-backdrop" onclick="_closeTopSheet()"></div>
    <div class="bottom-sheet" id="sheet-panel-${id}">
      <div class="sheet-handle"></div>
      ${titleHTML ? `
        <div class="sheet-header">
          <span class="sheet-title">${titleHTML}</span>
          <button class="icon-btn" onclick="_closeTopSheet()">${renderIcon('close')}</button>
        </div>
      ` : ''}
      <div class="sheet-body" id="sheet-body-${id}">${contentHTML}</div>
    </div>
  `;

  const screen = document.getElementById('screen');
  screen.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
}

function closeSheet(id) {
  const overlay = document.getElementById(`sheet-${id}`);
  if (!overlay) return;
  overlay.classList.remove('active');
  setTimeout(() => overlay.remove(), 320);
  _sheetStack = _sheetStack.filter(s => s.id !== id);
}

function _closeTopSheet() {
  if (!_sheetStack.length) return;
  const top = _sheetStack[_sheetStack.length - 1];
  if (top.onClose) top.onClose();
  closeSheet(top.id);
}

function updateSheetBody(id, contentHTML) {
  const body = document.getElementById(`sheet-body-${id}`);
  if (body) body.innerHTML = contentHTML;
}

/* ----- Toast ----- */
function showToast(message, type = 'success', duration = 2800) {
  const existing = document.getElementById('proto-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'proto-toast';
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  const screen = document.getElementById('screen');
  screen.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, duration);
}

/* ----- Spinner ----- */
function showSpinner(message = 'Loading...') {
  const screen = document.getElementById('screen');
  if (document.getElementById('proto-spinner')) return;
  const el = document.createElement('div');
  el.id = 'proto-spinner';
  el.className = 'spinner-overlay';
  el.innerHTML = `<div class="spinner"></div><span class="spinner-text">${message}</span>`;
  screen.appendChild(el);
}
function hideSpinner() {
  const el = document.getElementById('proto-spinner');
  if (el) el.remove();
}

/* ----- Pull to refresh -----
   Attaches a pull gesture to a scrollable container: dragging down from
   scrollTop 0 reveals a spinner behind it, and past the threshold calls
   onRefresh (sync or async) before snapping back. */
function initPullToRefresh(containerId, onRefresh) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const THRESHOLD = 60;
  const MAX_PULL = 90;

  // Wrap the container in its own relative box so the indicator sits directly
  // above the list — inserting it into the outer parent would place it behind
  // whatever header/topbar rows come before the container there.
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:relative;flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;';
  container.parentNode.insertBefore(wrapper, container);
  wrapper.appendChild(container);

  const indicator = document.createElement('div');
  indicator.className = 'ptr-indicator';
  indicator.innerHTML = '<div class="ptr-spinner"></div>';
  wrapper.insertBefore(indicator, container);

  let startY = 0, pulling = false, dragging = false, refreshing = false;

  container.addEventListener('pointerdown', (e) => {
    if (refreshing || container.scrollTop > 0) { pulling = false; return; }
    startY = e.clientY;
    pulling = true;
    dragging = false;
  });

  container.addEventListener('pointermove', (e) => {
    if (!pulling || refreshing) return;
    const dy = e.clientY - startY;
    if (dy <= 0) { dragging = false; return; }
    dragging = true;
    e.preventDefault();
    const pull = Math.min(dy * 0.5, MAX_PULL);
    indicator.style.opacity = String(Math.min(1, pull / THRESHOLD));
    container.style.transform = `translateY(${pull}px)`;
  });

  function finish() {
    if (!pulling) return;
    pulling = false;
    if (!dragging) return;
    const pulled = parseFloat((container.style.transform.match(/-?\d+\.?\d*/) || [0])[0]) || 0;
    container.style.transition = 'transform 200ms ease';

    if (pulled >= THRESHOLD) {
      refreshing = true;
      container.style.transform = `translateY(${THRESHOLD}px)`;
      indicator.style.opacity = '1';
      indicator.classList.add('spinning');
      const minDelay = new Promise(resolve => setTimeout(resolve, 500));
      Promise.all([Promise.resolve().then(onRefresh), minDelay]).then(() => {
        container.style.transform = 'translateY(0)';
        indicator.style.opacity = '0';
        indicator.classList.remove('spinning');
        refreshing = false;
        setTimeout(() => { container.style.transition = ''; }, 200);
      });
    } else {
      container.style.transform = 'translateY(0)';
      indicator.style.opacity = '0';
      setTimeout(() => { container.style.transition = ''; }, 200);
    }
  }

  container.addEventListener('pointerup', finish);
  container.addEventListener('pointercancel', finish);
}

/* ----- NPS Donut Chart (pure SVG) ----- */
function renderNPSChart(nps) {
  const cx = 80, cy = 80, r = 58, strokeW = 14;
  const total = nps.promoters + nps.passives + nps.detractors;
  const gap = 3; // degrees gap between segments
  const totalDeg = 360 - gap * 3;

  const promoterDeg = (nps.promoters / 100) * totalDeg;
  const passiveDeg  = (nps.passives  / 100) * totalDeg;
  const detractorDeg= (nps.detractors/ 100) * totalDeg;

  let start = -90; // start at top
  const pArc = _arc(cx, cy, r, start, start + promoterDeg);
  start += promoterDeg + gap;
  const passArc = _arc(cx, cy, r, start, start + passiveDeg);
  start += passiveDeg + gap;
  const detArc = _arc(cx, cy, r, start, start + detractorDeg);

  const scoreColor = nps.score >= 50 ? '#3FCA5A' : nps.score >= 0 ? '#F1DA7E' : '#F85271';

  return `
    <svg width="160" height="160" viewBox="0 0 160 160">
      <!-- Background ring -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#EEF3FB" stroke-width="${strokeW}"/>
      <!-- Detractor -->
      <path d="${detArc}" fill="none" stroke="#F85271" stroke-width="${strokeW}" stroke-linecap="round"/>
      <!-- Passive -->
      <path d="${passArc}" fill="none" stroke="#F1DA7E" stroke-width="${strokeW}" stroke-linecap="round"/>
      <!-- Promoter -->
      <path d="${pArc}" fill="none" stroke="#3FCA5A" stroke-width="${strokeW}" stroke-linecap="round"/>
      <!-- Center text -->
      <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-size="28" font-weight="700" fill="${scoreColor}">${nps.score >= 0 ? '+' : ''}${nps.score}</text>
      <text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="11" fill="#909090">NPS Score</text>
      <text x="${cx}" y="${cy + 26}" text-anchor="middle" font-size="10" fill="#909090">${nps.totalResponses.toLocaleString()} responses</text>
    </svg>
  `;
}

function _arc(cx, cy, r, startDeg, endDeg) {
  const toRad = a => a * Math.PI / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/* ----- CSAT bar ----- */
function renderCSATBar(csat) {
  return `
    <div style="padding:0 4px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:28px;font-weight:700;color:#1b87e6;">${csat.score}%</span>
        <div>
          <div style="font-size:11px;color:#909090;">CSAT Score</div>
          <div style="font-size:11px;color:#909090;">Mean: ${csat.mean}/5</div>
        </div>
      </div>
      <div style="height:12px;background:#EEF3FB;border-radius:6px;overflow:hidden;margin-bottom:12px;">
        <div style="height:100%;width:${csat.score}%;background:linear-gradient(90deg,#1b87e6,#1B3380);border-radius:6px;transition:width 800ms ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#909090;">
        <span>0%</span>
        <span style="color:#3FCA5A;font-weight:600;">↑ ${csat.trend}</span>
        <span>100%</span>
      </div>
    </div>
  `;
}

/* ----- Segment selector pill (Dashboard / Closedloop app bars) ----- */
function renderSegmentSelector(label, id, onclick) {
  return `
    <button class="seg-lean" onclick="${onclick}">
      <span class="seg-lean-value" id="${id}">${label}</span>
      <svg width="10" height="7" viewBox="0 0 12 8" fill="none" style="flex-shrink:0;"><path d="M1 1L6 6.5L11 1" stroke="#1B3380" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  `;
}

/* ----- App bar: segment selector + notification bell (Dashboard / Closedloop) -----
   `bordered` draws the bottom divider itself — pass false when the caller's own
   wrapping container (e.g. Dashboard's header block, which also contains the
   date filter bar) already owns that border. */
function renderAppBar({ segment, segmentLabelId, onSegmentClick, notificationCount, bordered = false }) {
  return `
    <div class="app-bar${bordered ? ' app-bar-bordered' : ''}">
      ${renderSegmentSelector(segment, segmentLabelId, onSegmentClick)}
      <button class="app-bar-bell" onclick="window.location.href='notifications.html'" aria-label="Notifications">
        ${renderIcon('bell', 22)}
        ${notificationCount ? `<span class="app-bar-bell-badge">${notificationCount}</span>` : ''}
      </button>
    </div>
  `;
}

/* ----- Date filter button (Dashboard / Closedloop app bars) ----- */
function renderDateFilterButton(label, id, onclick) {
  return `
    <button class="date-filter-btn" onclick="${onclick}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1b87e6" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <span class="date-filter-btn-label" id="${id}">${label}</span>
    </button>
  `;
}

/* ----- Shared header component ----- */
function renderHeader({ title, showBack = false, right = '' }) {
  return `
    <div class="nav-header">
      <div class="nav-header-left">
        ${showBack ? `<button class="icon-btn" onclick="goBack()">${renderIcon('back')}</button>` : ''}
      </div>
      <span class="nav-header-title">${title}</span>
      <div class="nav-header-right">${right}</div>
    </div>
  `;
}

/* ----- Ticket card ----- */
function renderTicketCard(ticket, onclick = '') {
  const status   = DATA.statusMap[ticket.statusId];
  const priority = DATA.priorityMap[ticket.priorityId];
  const assignee = DATA.managers.find(m => m.id === ticket.assigneeId);

  return `
    <div class="ticket-card" onclick="${onclick}">
      <div class="ticket-top">
        <span class="ticket-id">${ticket.id}</span>
        <span class="ticket-date">${formatDate(ticket.issueDate)}</span>
      </div>
      <div class="ticket-customer">${ticket.customer || 'Anonymous'}</div>
      <div class="ticket-email">${ticket.email}</div>
      ${ticket.comments.length ? `<div class="ticket-comment">${ticket.comments[ticket.comments.length - 1].text}</div>` : ''}
      <div class="ticket-bottom">
        <div class="ticket-pills">
          <span class="status-pill ${status.cssClass}">${status.label}</span>
          <span class="priority-pill ${priority.cssClass}">${priority.label}</span>
        </div>
        ${assignee ? `
          <div class="ticket-assignee">
            <div class="avatar avatar-sm" style="background:${assignee.avatarColor}">${assignee.initials}</div>
            <span class="ticket-assignee-name">${assignee.name.split(' ')[0]}</span>
          </div>
        ` : ''}
      </div>
      ${ticket.isOverdue ? '<div class="overdue-indicator"></div>' : ''}
    </div>
  `;
}

/* ----- Avatar helper ----- */
function renderAvatar(name, color = '#CC6677', size = '') {
  if (!name) return `<div class="avatar${size ? ` avatar-${size}` : ''}" style="background:${color}">?</div>`;
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  return `<div class="avatar${size ? ` avatar-${size}` : ''}" style="background:${color}">${initials}</div>`;
}

/* ----- Icons (inline SVG) ----- */
function renderIcon(name, size = 20) {
  const icons = {
    menu: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    back: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15,18 9,12 15,6"/></svg>`,
    close: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    search: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    filter: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/></svg>`,
    plus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    bell: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    chevron_right: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,18 15,12 9,6"/></svg>`,
    chevron_down: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"/></svg>`,
    check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`,
    send: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>`,
    trash: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>`,
    mail: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    dashboard: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    tickets: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2H5z"/></svg>`,
    settings: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    logout: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    ai: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
    eye: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    edit: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    segment: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    calendar: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    history: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>`,
    attach: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
  };
  return icons[name] || `<span style="font-size:${size}px;">•</span>`;
}

/* ----- Utility helpers ----- */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getManager(id) {
  return DATA.managers.find(m => m.id === id) || DATA.managers[0];
}

function getSegment(id) {
  return DATA.segments.find(s => s.id === id) || DATA.segments[0];
}

/* ----- Mock "user exists" lookup (New Ticket email-first flow) -----
   Simulates an async backend call. `error@test.com` is a sentinel that
   always rejects, for demoing the fail-open error path. */
function mockLookupCustomerByEmail(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.toLowerCase() === 'error@test.com') {
        reject(new Error('Lookup failed'));
        return;
      }
      const match = DATA.customers.find(c => c.email.toLowerCase() === email.toLowerCase());
      resolve(match || null);
    }, 700);
  });
}

/* ----- Date filter sheet (Dashboard + Closedloop) -----
   Single-screen bottom sheet: quick-range chips + always-visible custom
   start/end fields (no tabs). Callers pass their current {key, startISO,
   endISO} and get the same shape back on apply — the sheet resolves quick
   ranges to real date boundaries itself, so callers never parse a label
   back into dates. */
const _DATE_QUICK_RANGES = [
  { key: 'all',       label: 'All time' },
  { key: 'last7',     label: 'Last 7 days' },
  { key: 'last30',    label: 'Last 30 days' },
  { key: 'thismonth', label: 'This month' },
  { key: 'lastmonth', label: 'Last month' },
  { key: 'last3',     label: 'Last 3 months' },
  { key: 'last6',     label: 'Last 6 months' },
];

let _dateFilter = {
  selectedKey: 'all',
  startDate: DATA.dateRangeStart, // ISO (yyyy-mm-dd), bound to <input type="date">
  endDate: DATA.dateRangeEnd,
  onApply: null,
};

function _dfToISO(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function _dfFmt(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* Resolves a quick-range key to real {start, end} Date boundaries, relative to now. */
function _dfResolveQuickRange(key) {
  const now = new Date();
  const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  switch (key) {
    case 'last7': {
      const s = new Date(now); s.setDate(s.getDate() - 7);
      return { start: startOfDay(s), end: endOfToday };
    }
    case 'last30': {
      const s = new Date(now); s.setDate(s.getDate() - 30);
      return { start: startOfDay(s), end: endOfToday };
    }
    case 'thismonth':
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfToday };
    case 'lastmonth':
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        end: new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999),
      };
    case 'last3':
      return { start: startOfDay(new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())), end: endOfToday };
    case 'last6':
      return { start: startOfDay(new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())), end: endOfToday };
    case 'all':
    default:
      return { start: new Date(DATA.dateRangeStart + 'T00:00:00'), end: new Date(DATA.dateRangeEnd + 'T23:59:59.999') };
  }
}

function _dfLabelFor(key, startISO, endISO) {
  if (key !== 'custom') {
    const q = _DATE_QUICK_RANGES.find(r => r.key === key);
    if (q) return q.label;
  }
  return `${_dfFmt(startISO)} - ${_dfFmt(endISO)}`;
}

function openDateFilterSheet(current, onApply) {
  _dateFilter.selectedKey = (current && current.key) || 'all';
  _dateFilter.startDate = (current && current.startISO) || DATA.dateRangeStart;
  _dateFilter.endDate = (current && current.endISO) || DATA.dateRangeEnd;
  _dateFilter.onApply = onApply;

  const overlay = document.createElement('div');
  overlay.id = 'df-overlay';
  overlay.style.cssText = 'position:absolute;inset:0;z-index:200;display:flex;flex-direction:column;justify-content:flex-end;';
  overlay.innerHTML = _renderDateFilterSheet();
  document.getElementById('screen').appendChild(overlay);
}

function closeDateFilterSheet() {
  const el = document.getElementById('df-overlay');
  if (el) el.remove();
}

function _redrawDateFilterSheet() {
  const el = document.getElementById('df-overlay');
  if (el) el.innerHTML = _renderDateFilterSheet();
}

function _renderDateFilterSheet() {
  const chipsHTML = _DATE_QUICK_RANGES.map(r => {
    const active = r.key === _dateFilter.selectedKey;
    return `<div onclick="window._dfPickQuick('${r.key}')"
      style="display:inline-flex;align-items:center;padding:9px 16px;border-radius:20px;font-size:14px;font-family:var(--font);cursor:pointer;user-select:none;${active ? 'background:#1B3380;color:#fff;' : 'background:#EEF3FB;color:#545E6B;'}">
      ${r.label}
    </div>`;
  }).join('');

  const isCustom = _dateFilter.selectedKey === 'custom';

  return `
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45);" onclick="closeDateFilterSheet()"></div>
    <div style="background:#fff;border-radius:20px 20px 0 0;display:flex;flex-direction:column;max-height:88%;position:relative;z-index:1;" onclick="event.stopPropagation()">

      <!-- Handle -->
      <div style="display:flex;justify-content:center;padding:10px 0 0;flex-shrink:0;">
        <div style="width:40px;height:4px;background:#DCDCDC;border-radius:2px;"></div>
      </div>

      <!-- Title row -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px 4px;flex-shrink:0;">
        <span style="font-size:22px;font-weight:700;color:#404A5B;font-family:var(--font);">Filter by date</span>
        <button onclick="closeDateFilterSheet()" style="background:none;border:none;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:#545E6B;padding:0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div style="flex:1;overflow-y:auto;padding:12px 20px 4px;">
        <!-- Quick ranges -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;padding-bottom:18px;">
          ${chipsHTML}
        </div>

        <div style="height:1px;background:#F0F0F0;margin-bottom:18px;"></div>

        <!-- Custom range — always visible, editing either field switches selection to Custom -->
        <div style="font-size:15px;font-weight:700;color:#404A5B;font-family:var(--font);margin-bottom:12px;">
          Custom range${isCustom ? ' <span style="color:#1b87e6;font-weight:600;">(selected)</span>' : ''}
        </div>
        <div style="display:flex;gap:12px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:12.5px;color:#909090;font-family:var(--font);margin-bottom:6px;">Start date</div>
            <input type="date" value="${_dateFilter.startDate}" max="${_dateFilter.endDate}"
              onchange="window._dfSetCustom('start', this.value)"
              style="width:100%;padding:11px 10px;border:1px solid #E4E4E4;border-radius:8px;font-size:14px;color:#404A5B;font-family:var(--font);background:#fff;"/>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:12.5px;color:#909090;font-family:var(--font);margin-bottom:6px;">End date</div>
            <input type="date" value="${_dateFilter.endDate}" min="${_dateFilter.startDate}"
              onchange="window._dfSetCustom('end', this.value)"
              style="width:100%;padding:11px 10px;border:1px solid #E4E4E4;border-radius:8px;font-size:14px;color:#404A5B;font-family:var(--font);background:#fff;"/>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="display:flex;gap:12px;padding:16px 20px 20px;flex-shrink:0;border-top:1px solid #F0F0F0;">
        <button onclick="window._dfReset()" style="flex:1;height:52px;background:#fff;border:1.5px solid #1b87e6;border-radius:8px;color:#1b87e6;font-size:16px;font-family:var(--font);font-weight:600;cursor:pointer;">Reset</button>
        <button onclick="window._dfApply()" style="flex:1;height:52px;background:#1b87e6;border:none;border-radius:8px;color:#fff;font-size:16px;font-family:var(--font);font-weight:600;cursor:pointer;">Apply</button>
      </div>
    </div>
  `;
}

window._dfPickQuick = function(key) {
  _dateFilter.selectedKey = key;
  const bounds = _dfResolveQuickRange(key);
  _dateFilter.startDate = _dfToISO(bounds.start);
  _dateFilter.endDate = _dfToISO(bounds.end);
  _redrawDateFilterSheet();
};

window._dfSetCustom = function(which, value) {
  _dateFilter.selectedKey = 'custom';
  if (which === 'start') {
    _dateFilter.startDate = value;
    if (_dateFilter.endDate < value) _dateFilter.endDate = value;
  } else {
    _dateFilter.endDate = value;
    if (_dateFilter.startDate > value) _dateFilter.startDate = value;
  }
  _redrawDateFilterSheet();
};

window._dfReset = function() {
  _dateFilter.selectedKey = 'all';
  _dateFilter.startDate = DATA.dateRangeStart;
  _dateFilter.endDate = DATA.dateRangeEnd;
  _redrawDateFilterSheet();
};

window._dfApply = function() {
  const key = _dateFilter.selectedKey;
  const startISO = _dateFilter.startDate;
  const endISO = _dateFilter.endDate;
  const label = _dfLabelFor(key, startISO, endISO);
  const onApply = _dateFilter.onApply;
  closeDateFilterSheet();
  if (onApply) onApply({ key, startISO, endISO, label });
};

/* ----- Segment selector sheet ----- */
let _seg = { current: '', query: '', onSelect: null };

function openSegmentSheet(currentSegment, onSelect) {
  _seg.current = currentSegment;
  _seg.query   = '';
  _seg.onSelect = onSelect;

  let overlay = document.getElementById('seg-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'seg-overlay';
    overlay.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;z-index:200;display:flex;flex-direction:column;justify-content:flex-end;';
    document.getElementById('screen').appendChild(overlay);
  }
  _redrawSegSheet();
}

function closeSegmentSheet() {
  const el = document.getElementById('seg-overlay');
  if (el) el.remove();
}

function _redrawSegSheet() {
  const overlay = document.getElementById('seg-overlay');
  if (!overlay) return;
  const q = _seg.query.toLowerCase();
  const list = DATA.segments.filter(s => !q || s.name.toLowerCase().includes(q));

  const radioOn  = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#1b87e6" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="6" fill="#1b87e6"/></svg>`;
  const radioOff = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#BDBDBD" stroke-width="2" fill="none"/></svg>`;

  const items = list.map(s => {
    const sel = s.name === _seg.current;
    return `<div onclick="window._segPick(\`${s.name}\`)" style="display:flex;align-items:center;padding:18px 0;border-bottom:1px solid rgba(0,0,0,0.08);cursor:pointer;">
      <span style="flex:1;font-size:17px;color:#545E6B;font-family:var(--font);">${s.name}</span>
      ${sel ? radioOn : radioOff}
    </div>`;
  }).join('');

  overlay.innerHTML = `
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45);" onclick="closeSegmentSheet()"></div>
    <div style="background:#fff;border-radius:20px 20px 0 0;display:flex;flex-direction:column;max-height:78%;position:relative;z-index:1;" onclick="event.stopPropagation()">

      <!-- Handle -->
      <div style="display:flex;justify-content:center;padding:10px 0 0;">
        <div style="width:40px;height:4px;background:#DCDCDC;border-radius:2px;"></div>
      </div>

      <!-- Title row -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;">
        <span style="font-size:22px;font-weight:700;color:#404A5B;font-family:var(--font);">Segment</span>
        <button onclick="closeSegmentSheet()" style="background:none;border:none;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:#545E6B;padding:0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Search bar (flat Material style) -->
      <div style="padding:0 16px 14px;">
        <div style="display:flex;align-items:center;background:#F3F5F8;border-radius:8px 8px 0 0;padding:10px 12px;border-bottom:1.5px solid rgba(0,0,0,0.18);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#909090" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="seg-search"
            type="text"
            placeholder="Search using segment name"
            value="${_seg.query}"
            oninput="window._segSearch(this.value)"
            style="flex:1;border:none;background:transparent;margin-left:10px;font-size:15px;color:#545E6B;font-family:var(--font);outline:none;"
          />
        </div>
      </div>

      <!-- Segment list -->
      <div style="flex:1;overflow-y:auto;padding:0 16px;">
        ${items}
      </div>

      <!-- Select segment button -->
      <div style="padding:12px 16px 20px;flex-shrink:0;">
        <button onclick="window._segApply()" style="width:100%;height:52px;background:#1b87e6;color:#fff;font-size:18px;font-family:var(--font);border:none;border-radius:8px;cursor:pointer;font-weight:500;">
          Select segment
        </button>
      </div>
    </div>
  `;
}

window._segPick = function(name) {
  _seg.current = name;
  _redrawSegSheet();
};

window._segSearch = function(q) {
  _seg.query = q;
  _redrawSegSheet();
  const inp = document.getElementById('seg-search');
  if (inp) { inp.focus(); inp.setSelectionRange(q.length, q.length); }
};

window._segApply = function() {
  const seg = DATA.segments.find(s => s.name === _seg.current);
  closeSegmentSheet();
  if (_seg.onSelect) _seg.onSelect(seg ? seg.id : 0, _seg.current);
};
