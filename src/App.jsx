import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import { EditModal, ChangeOwnerModal, DeleteModal, AddModal } from './components/Modals';
import { useSites } from './hooks/useSites';
import AdminView from './pages/AdminView';
import OwnerView from './pages/OwnerView';

const MAX_WIDTH = '1240px';

const styles = {
  notes: {
    maxWidth: MAX_WIDTH,
    margin: '0 auto',
    padding: '0 24px 32px',
  },
  notesInner: {
    background: '#eff6ff',
    border: '1px solid #b3d1f5',
    borderRadius: '8px',
    padding: '14px 18px',
  },
  notesHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 600,
    fontSize: '13px',
    color: '#005CB9',
    marginBottom: '8px',
  },
  notesIcon: {
    width: '18px',
    height: '18px',
    background: '#005CB9',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    flexShrink: 0,
  },
  notesList: {
    listStyle: 'disc',
    paddingLeft: '20px',
    color: '#005CB9',
    fontSize: '13px',
    lineHeight: 1.8,
  },
  navBar: {
    background: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0',
    padding: '0 24px',
  },
  navInner: {
    maxWidth: MAX_WIDTH,
    margin: '0 auto',
    display: 'flex',
    gap: '4px',
  },
  navLink: {
    display: 'inline-block',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#555',
    textDecoration: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
  },
  navLinkActive: {
    color: '#005CB9',
    borderBottom: '2px solid #005CB9',
  },
};

function NavBar() {
  const location = useLocation();
  return (
    <div style={styles.navBar}>
      <div style={styles.navInner}>
        <Link
          to="/"
          style={{
            ...styles.navLink,
            ...(location.pathname === '/' ? styles.navLinkActive : {}),
          }}
        >
          My Sites
        </Link>
        <Link
          to="/admin"
          style={{
            ...styles.navLink,
            ...(location.pathname === '/admin' ? styles.navLinkActive : {}),
          }}
        >
          Admin
        </Link>
      </div>
    </div>
  );
}

function AppContent() {
  const { sites, addSite, updateSite, deleteSite, inactiveSites, sitesWithNoOwner } = useSites();

  const [editSite, setEditSite] = useState(null);
  const [ownerSite, setOwnerSite] = useState(null);
  const [deleteSiteTarget, setDeleteSiteTarget] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  function handleSaveEdit(id, updates) {
    updateSite(id, updates);
    setEditSite(null);
  }

  function handleConfirmDelete(id) {
    deleteSite(id);
    setDeleteSiteTarget(null);
  }

  function handleAdd(form) {
    addSite(form);
    setShowAdd(false);
  }

  const sharedProps = {
    onEdit: site => setEditSite(site),
    onChangeOwner: site => setOwnerSite(site),
    onDelete: site => setDeleteSiteTarget(site),
    onAdd: () => setShowAdd(true),
  };

  return (
    <div>
      <Topbar maxWidth={MAX_WIDTH} />
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <OwnerView
              sites={sites}
              {...sharedProps}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminView
              sites={sites}
              inactiveSites={inactiveSites}
              sitesWithNoOwner={sitesWithNoOwner}
              {...sharedProps}
            />
          }
        />
      </Routes>

      <div style={styles.notes}>
        <div style={styles.notesInner}>
          <div style={styles.notesHead}>
            <span style={styles.notesIcon}>i</span>
            Important Notes
          </div>
          <ul style={styles.notesList}>
            <li>Ownership change requests will be reviewed by IT administrators</li>
            <li>Site deletions are permanent and cannot be undone</li>
            <li>You will receive email confirmations for all requested changes</li>
          </ul>
        </div>
      </div>

      {editSite && <EditModal site={editSite} onSave={handleSaveEdit} onClose={() => setEditSite(null)} />}
      {ownerSite && <ChangeOwnerModal site={ownerSite} onClose={() => setOwnerSite(null)} />}
      {deleteSiteTarget && <DeleteModal site={deleteSiteTarget} onConfirm={handleConfirmDelete} onClose={() => setDeleteSiteTarget(null)} />}
      {showAdd && <AddModal onSave={handleAdd} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}