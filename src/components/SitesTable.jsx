import { useState } from 'react';

const styles = {
  panel: {
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px 24px',
    marginBottom: '20px',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  panelTitle: { fontSize: '16px', fontWeight: 600, color: '#1a1a1a' },
  panelSub: { fontSize: '13px', color: '#666', marginTop: '2px' },
  panelActions: { display: 'flex', gap: '10px', alignItems: 'center' },
  searchWrap: { position: 'relative' },
  searchInput: {
    height: '36px',
    padding: '0 12px 0 34px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#333',
    outline: 'none',
    width: '220px',
    background: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    left: '11px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
    fontSize: '14px',
    pointerEvents: 'none',
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    height: '36px',
    padding: '0 18px',
    background: '#2E7D32',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    userSelect: 'none',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 600,
    color: '#333',
    padding: '10px 12px',
    borderBottom: '1px solid #e0e0e0',
  },
  thSortable: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  td: {
    padding: '14px 12px',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '13px',
    verticalAlign: 'middle',
  },
  siteLink: {
    color: '#005CB9',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  rowActs: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'flex-end',
  },
  act: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  actEdit: {
    border: '1px solid #ccc',
    background: '#fff',
    color: '#444',
  },
  actOwner: {
    border: '1px solid #b3d1f5',
    background: '#eff6ff',
    color: '#005CB9',
  },
  actDelete: {
    border: '1px solid #f5c2c2',
    background: '#fff5f5',
    color: '#c62828',
  },
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

function SortIcon({ direction }) {
  if (!direction) return <span style={{ opacity: 0.3, fontSize: '11px', marginLeft: '4px' }}>↕</span>;
  return <span style={{ fontSize: '11px', marginLeft: '4px', color: '#005CB9' }}>{direction === 'asc' ? '↑' : '↓'}</span>;
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

export default function SitesTable({ sites, isAdmin, onEdit, onChangeOwner, onDelete, onAdd }) {
  const [query, setQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAct, setHoveredAct] = useState(null);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  }

  const filtered = sites.filter(s => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.url.toLowerCase().includes(q) ||
      (s.owner && s.owner.toLowerCase().includes(q))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0;
    let valA, valB;
    if (sortCol === 'name') {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
      return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (sortCol === 'owner') {
      valA = (a.owner || '').toLowerCase();
      valB = (b.owner || '').toLowerCase();
      return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (sortCol === 'storage') {
      valA = parseSortableStorage(a.storage);
      valB = parseSortableStorage(b.storage);
    }
    if (sortCol === 'accessed') {
      valA = parseSortableDate(a.accessed);
      valB = parseSortableDate(b.accessed);
    }
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  const shortUrl = (url) => {
    const stripped = url.replace('https://', '');
    return stripped.length > 44 ? stripped.substring(0, 44) + '…' : stripped;
  };

  const buttons = (site) => [
    {
      label: 'Edit',
      icon: <EditIcon />,
      action: () => onEdit(site),
      key: `edit-${site.id}`,
      baseStyle: styles.actEdit,
      hoverBg: '#f5f5f5',
      hoverColor: '#1a1a1a',
    },
    {
      label: 'Change Owner',
      icon: <OwnerIcon />,
      action: () => onChangeOwner(site),
      key: `owner-${site.id}`,
      baseStyle: styles.actOwner,
      hoverBg: '#dbeeff',
      hoverColor: '#004fa3',
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      action: () => onDelete(site),
      key: `delete-${site.id}`,
      baseStyle: styles.actDelete,
      hoverBg: '#ffe0e0',
      hoverColor: '#a31f1f',
    },
  ];

  const columns = [
    { key: 'name', label: 'Site Name', sortable: true, width: '200px' },
    { key: 'url', label: 'URL', sortable: false },
    ...(isAdmin ? [{ key: 'owner', label: 'Owner', sortable: true, width: '180px' }] : []),
    { key: 'storage', label: 'Storage Size', sortable: true },
    { key: 'accessed', label: 'Last Accessed', sortable: true },
    { key: 'actions', label: '', sortable: false },
  ];

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <div>
          <div style={styles.panelTitle}>
            {isAdmin ? 'All Sites' : 'My Sites'}
          </div>
          <div style={styles.panelSub}>
            {isAdmin ? 'Admin view — all SharePoint sites' : 'View and manage your SharePoint sites'}
          </div>
        </div>
        <div style={styles.panelActions}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              type="text"
              placeholder="Search sites…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div
            style={styles.cta}
            role="button"
            tabIndex={0}
            onClick={onAdd}
            onKeyDown={e => e.key === 'Enter' && onAdd()}
          >
            ⊕ &nbsp;Request New Site
          </div>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  ...styles.th,
                  ...(col.sortable ? styles.thSortable : {}),
                  ...(col.width ? { width: col.width } : {}),
                  ...(sortCol === col.key ? { color: '#005CB9' } : {}),
                }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label}
                {col.sortable && <SortIcon direction={sortCol === col.key ? sortDir : null} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ ...styles.td, textAlign: 'center', color: '#999', padding: '40px' }}>
                No sites found.
              </td>
            </tr>
          )}
          {sorted.map(site => (
            <tr
              key={site.id}
              onMouseEnter={() => setHoveredRow(site.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{ background: hoveredRow === site.id ? '#f0f6ff' : 'transparent' }}
            >
              <td style={{ ...styles.td, fontWeight: 600, width: '200px', wordBreak: 'break-word' }}>
                {site.name}
              </td>
              <td style={styles.td}>
                <a href={site.url} target="_blank" rel="noreferrer" style={styles.siteLink}>
                  {shortUrl(site.url)} ↗
                </a>
              </td>
              {isAdmin && (
                <td style={{ ...styles.td, width: '180px', color: '#555' }}>
                  {site.owner || 'Unassigned'}
                </td>
              )}
              <td style={styles.td}>{site.storage}</td>
              <td style={{ ...styles.td, color: '#555' }}>{site.accessed}</td>
              <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                <div style={styles.rowActs}>
                  {buttons(site).map(btn => (
                    <div
                      key={btn.key}
                      role="button"
                      tabIndex={0}
                      onClick={btn.action}
                      onKeyDown={e => e.key === 'Enter' && btn.action()}
                      onMouseEnter={() => setHoveredAct(btn.key)}
                      onMouseLeave={() => setHoveredAct(null)}
                      style={{
                        ...styles.act,
                        ...btn.baseStyle,
                        ...(hoveredAct === btn.key ? { background: btn.hoverBg, color: btn.hoverColor } : {}),
                      }}
                    >
                      {btn.icon} {btn.label}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}