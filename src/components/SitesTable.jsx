import { useState } from 'react';

const styles = {
  panel: { background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px 24px', marginBottom: '20px' },
  panelHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' },
  panelTitle: { fontSize: '16px', fontWeight: 600, color: '#1a1a1a' },
  panelSub: { fontSize: '13px', color: '#666', marginTop: '2px' },
  panelActions: { display: 'flex', gap: '10px', alignItems: 'center' },
  filterBar: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
  filterBtn: { display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', userSelect: 'none', border: '1px solid #e0e0e0', background: '#fff', color: '#555' },
  filterBtnActive: { background: '#005CB9', color: '#fff', border: '1px solid #005CB9' },
  filterBtnWarning: { background: '#b45309', color: '#fff', border: '1px solid #b45309' },
  filterBtnDanger: { background: '#c62828', color: '#fff', border: '1px solid #c62828' },
  filterBtnGreen: { background: '#2E7D32', color: '#fff', border: '1px solid #2E7D32' },
  searchWrap: { position: 'relative' },
  searchInput: { height: '36px', padding: '0 12px 0 35px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '13px', color: '#333', outline: 'none', width: '220px', background: '#fff' },
  searchIcon: { position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', pointerEvents: 'none' },
  cta: { display: 'inline-flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 18px', background: '#2E7D32', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', userSelect: 'none' },
  exportBtn: { display: 'inline-flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 14px', background: '#fff', color: '#555', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', userSelect: 'none', border: '1px solid #ccc' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#333', padding: '10px 12px', borderBottom: '1px solid #e0e0e0' },
  thSortable: { cursor: 'pointer', userSelect: 'none' },
  td: { padding: '14px 12px', borderBottom: '1px solid #f0f0f0', fontSize: '13px', verticalAlign: 'middle' },
  siteLink: { color: '#005CB9', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' },
  adminNameLink: { textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#1a1a1a' },
  openLink: { display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#005CB9', textDecoration: 'none', fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '6px', border: '1px solid #b3d1f5', background: '#eff6ff', whiteSpace: 'nowrap' },
  rowActs: { display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' },
  act: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' },
  actEdit: { border: '1px solid #ccc', background: '#fff', color: '#444' },
  actOwner: { border: '1px solid #b3d1f5', background: '#eff6ff', color: '#005CB9' },
  actDelete: { border: '1px solid #f5c2c2', background: '#fff5f5', color: '#c62828' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 },
  badgeNoOwner: { background: '#fef2f2', color: '#c62828', border: '1px solid #fca5a5' },
  badgeInactive: { background: '#fffbeb', color: '#b45309', border: '1px solid #fcd34d' },
  badgeOk: { background: '#f0fdf4', color: '#2E7D32', border: '1px solid #86efac' },
};

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function OwnerIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function SortIcon({ direction }) {
  if (!direction) {
    return <span style={{ marginLeft: '5px', fontSize: '12px', color: '#999', fontWeight: 400 }}>⇅</span>;
  }
  return (
    <span style={{ marginLeft: '5px', fontSize: '12px', color: '#005CB9', fontWeight: 700 }}>
      {direction === 'asc' ? '↑' : '↓'}
    </span>
  );
}

function parseSortableStorage(str) {
  if (!str) return 0;
  const num = parseFloat(str);
  if (isNaN(num)) return 0;
  if (str.includes('GB')) return num * 1000;
  return num;
}

function parseSortableDate(str) {
  if (!str || str === 'No activity') return 0;
  return new Date(str).getTime() || 0;
}

function getStatusSort(site) {
  if (site.numOwners === 0) return 0;
  if (site.actionNeeded) return 1;
  return 2;
}

function getStatusBadge(site) {
  if (site.numOwners === 0) return <span style={Object.assign({}, styles.badge, styles.badgeNoOwner)}>No Owner</span>;
  if (site.actionNeeded) return <span style={Object.assign({}, styles.badge, styles.badgeInactive)}>Needs Action</span>;
  return <span style={Object.assign({}, styles.badge, styles.badgeOk)}>Active</span>;
}

function shortAdminUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) return '/' + parts.slice(0, 2).join('/');
    return u.pathname;
  } catch (e) {
    return url;
  }
}

function getSharePointAdminUrl(siteUrl) {
  const encoded = encodeURIComponent(siteUrl);
  return 'https://admin.microsoft.com/sharepoint?page=siteManagement&modern=true&siteUrl=' + encoded;
}

function exportToCSV(sites, isAdmin) {
  const headers = isAdmin
    ? ['Site Name', 'URL', 'Owner', 'Status', 'Storage Size', 'Last Accessed']
    : ['Site Name', 'URL', 'Storage Size', 'Last Accessed'];
  const rows = sites.map(function(s) {
    const status = s.numOwners === 0 ? 'No Owner' : s.actionNeeded ? 'Needs Action' : 'Active';
    if (isAdmin) return [s.name, s.url, s.owner || 'Unassigned', status, s.storage, s.accessed];
    return [s.name, s.url, s.storage, s.accessed];
  });
  const csv = [headers].concat(rows).map(function(row) {
    return row.map(function(cell) { return '"' + (cell || '') + '"'; }).join(',');
  }).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = isAdmin ? 'all-sites.csv' : 'my-sites.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function SitesTable({ sites, isAdmin, onEdit, onChangeOwner, onDelete, onAdd }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAct, setHoveredAct] = useState(null);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(function(d) { return d === 'asc' ? 'desc' : 'asc'; });
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  }

  const filtered = sites.filter(function(s) {
    const matchesQuery = !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.url.toLowerCase().includes(query.toLowerCase()) ||
      (s.owner && s.owner.toLowerCase().includes(query.toLowerCase()));
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'noowner' && s.numOwners === 0) ||
      (statusFilter === 'action' && s.actionNeeded && s.numOwners > 0) ||
      (statusFilter === 'active' && !s.actionNeeded && s.numOwners > 0);
    return matchesQuery && matchesStatus;
  });

  const sorted = filtered.slice().sort(function(a, b) {
    if (!sortCol) return 0;
    var valA, valB;
    if (sortCol === 'name') { return sortDir === 'asc' ? a.name.toLowerCase().localeCompare(b.name.toLowerCase()) : b.name.toLowerCase().localeCompare(a.name.toLowerCase()); }
    if (sortCol === 'owner') { return sortDir === 'asc' ? (a.owner||'').toLowerCase().localeCompare((b.owner||'').toLowerCase()) : (b.owner||'').toLowerCase().localeCompare((a.owner||'').toLowerCase()); }
    if (sortCol === 'status') { valA = getStatusSort(a); valB = getStatusSort(b); }
    if (sortCol === 'storage') { valA = parseSortableStorage(a.storage); valB = parseSortableStorage(b.storage); }
    if (sortCol === 'accessed') { valA = parseSortableDate(a.accessed); valB = parseSortableDate(b.accessed); }
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  function shortUrl(url) {
    const stripped = url.replace('https://', '');
    return stripped.length > 44 ? stripped.substring(0, 44) + '...' : stripped;
  }

  const ownerBtnDefs = [
    { label: 'Edit', icon: <EditIcon />, baseStyle: styles.actEdit, hoverBg: '#f5f5f5', hoverColor: '#1a1a1a', getAction: function(site) { return function() { onEdit(site); }; }, getKey: function(site) { return 'edit-' + site.id; } },
    { label: 'Change Owner', icon: <OwnerIcon />, baseStyle: styles.actOwner, hoverBg: '#dbeeff', hoverColor: '#004fa3', getAction: function(site) { return function() { onChangeOwner(site); }; }, getKey: function(site) { return 'owner-' + site.id; } },
    { label: 'Request Delete', icon: <DeleteIcon />, baseStyle: styles.actDelete, hoverBg: '#ffe0e0', hoverColor: '#a31f1f', getAction: function(site) { return function() { onDelete(site); }; }, getKey: function(site) { return 'delete-' + site.id; } },
  ];

  const noOwnerCount = sites.filter(function(s) { return s.numOwners === 0; }).length;
  const actionCount = sites.filter(function(s) { return s.actionNeeded && s.numOwners > 0; }).length;
  const activeCount = sites.filter(function(s) { return !s.actionNeeded && s.numOwners > 0; }).length;

  const filterButtons = [
    { key: 'all', label: 'All (' + sites.length + ')', activeStyle: styles.filterBtnActive },
    { key: 'noowner', label: 'No Owner (' + noOwnerCount + ')', activeStyle: styles.filterBtnDanger },
    { key: 'action', label: 'Needs Action (' + actionCount + ')', activeStyle: styles.filterBtnWarning },
    { key: 'active', label: 'Active (' + activeCount + ')', activeStyle: styles.filterBtnGreen },
  ];

  const ownerColumns = [
    { key: 'name', label: 'Site Name', sortable: true, width: '200px' },
    { key: 'url', label: 'URL', sortable: false },
    { key: 'storage', label: 'Storage Size', sortable: true },
    { key: 'accessed', label: 'Last Accessed', sortable: true },
    { key: 'actions', label: '', sortable: false },
  ];

  const adminColumns = [
    { key: 'name', label: 'Site Name', sortable: true, width: '200px' },
    { key: 'url', label: 'URL', sortable: false, width: '140px' },
    { key: 'owner', label: 'Owner', sortable: true, width: '150px' },
    { key: 'status', label: 'Status', sortable: true, width: '130px' },
    { key: 'storage', label: 'Storage', sortable: true, width: '90px' },
    { key: 'accessed', label: 'Last Accessed', sortable: true, width: '120px' },
    { key: 'actions', label: '', sortable: false, width: '160px' },
  ];

  const columns = isAdmin ? adminColumns : ownerColumns;

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <div>
          <div style={styles.panelTitle}>{isAdmin ? 'All Sites' : 'My Sites'}</div>
          <div style={styles.panelSub}>{isAdmin ? 'Admin view — all SharePoint sites' : 'View and manage your SharePoint sites'}</div>
        </div>
        <div style={styles.panelActions}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}><svg style={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input type="text" placeholder="Search sites..." value={query} onChange={function(e) { setQuery(e.target.value); }} style={styles.searchInput} />
          </div>
          <div style={styles.exportBtn} role="button" tabIndex={0} onClick={function() { exportToCSV(sorted, isAdmin); }}>
            <ExportIcon /> Export
          </div>
          {!isAdmin && (
            <div style={styles.cta} role="button" tabIndex={0} onClick={onAdd}>
              + Request New Site
            </div>
          )}
        </div>
      </div>

      {isAdmin && (
        <div style={styles.filterBar}>
          {filterButtons.map(function(btn) {
            return (
              <div key={btn.key} role="button" tabIndex={0} onClick={function() { setStatusFilter(btn.key); }}
                style={Object.assign({}, styles.filterBtn, statusFilter === btn.key ? btn.activeStyle : {})}>
                {btn.label}
              </div>
            );
          })}
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map(function(col) {
              return (
                <th key={col.key}
                  style={Object.assign({}, styles.th, col.sortable ? styles.thSortable : {}, col.width ? { width: col.width } : {}, sortCol === col.key ? { color: '#005CB9' } : {})}
                  onClick={function() { if (col.sortable) handleSort(col.key); }}>
                  {col.label}
                  {col.sortable && <SortIcon direction={sortCol === col.key ? sortDir : null} />}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr><td colSpan={columns.length} style={Object.assign({}, styles.td, { textAlign: 'center', color: '#999', padding: '40px' })}>No sites found.</td></tr>
          )}
          {sorted.map(function(site) {
            return (
              <tr key={site.id}
                onMouseEnter={function() { setHoveredRow(site.id); }}
                onMouseLeave={function() { setHoveredRow(null); }}
                style={{ background: hoveredRow === site.id ? '#f0f6ff' : 'transparent' }}>
                <td style={Object.assign({}, styles.td, { fontWeight: 600, wordBreak: 'break-word' })}>
                  {isAdmin ? (
                    <a href={site.url} target="_blank" rel="noreferrer" style={styles.adminNameLink}>{site.name} ↗</a>
                  ) : site.name}
                </td>
                <td style={styles.td}>
                  {isAdmin ? (
                    <span style={{ fontSize: '12px', color: '#777', fontFamily: 'monospace' }}>{shortAdminUrl(site.url)}</span>
                  ) : (
                    <a href={site.url} target="_blank" rel="noreferrer" style={styles.siteLink}>{shortUrl(site.url)} ↗</a>
                  )}
                </td>
                {isAdmin && <td style={Object.assign({}, styles.td, { color: '#555' })}>{site.owner || 'Unassigned'}</td>}
                {isAdmin && <td style={styles.td}>{getStatusBadge(site)}</td>}
                <td style={styles.td}>{site.storage}</td>
                <td style={Object.assign({}, styles.td, { color: '#555' })}>{site.accessed}</td>
                <td style={Object.assign({}, styles.td, { whiteSpace: 'nowrap' })}>
                  {isAdmin ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <a href={getSharePointAdminUrl(site.url)} target="_blank" rel="noreferrer" style={styles.openLink}>Open in SharePoint Admin</a>
                    </div>
                  ) : (
                    <div style={styles.rowActs}>
                      {ownerBtnDefs.map(function(btn) {
                        const key = btn.getKey(site);
                        const action = btn.getAction(site);
                        return (
                          <div key={key} role="button" tabIndex={0} onClick={action}
                            onMouseEnter={function() { setHoveredAct(key); }}
                            onMouseLeave={function() { setHoveredAct(null); }}
                            style={Object.assign({}, styles.act, btn.baseStyle, hoveredAct === key ? { background: btn.hoverBg, color: btn.hoverColor } : {})}>
                            {btn.icon} {btn.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
