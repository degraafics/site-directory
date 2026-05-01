import { useState } from 'react';
import Topbar from './components/Topbar';
import MetricCards from './components/MetricCards';
import SitesTable from './components/SitesTable';
import { EditModal, ChangeOwnerModal, DeleteModal, AddModal } from './components/Modals';
import { useSites } from './hooks/useSites';

const MAX_WIDTH = '1240px';

const styles = {
  page: {
    padding: '32px 24px',
    maxWidth: MAX_WIDTH,
    margin: '0 auto',
  },
  notes: {
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
};

export default function App() {
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

  return (
    <div>
      <Topbar maxWidth={MAX_WIDTH} />

      <div style={styles.page}>
        <MetricCards total={sites.length} actionNeeded={inactiveSites} noOwner={sitesWithNoOwner} />

        <SitesTable
          sites={sites}
          onEdit={site => setEditSite(site)}
          onChangeOwner={site => setOwnerSite(site)}
          onDelete={site => setDeleteSiteTarget(site)}
          onAdd={() => setShowAdd(true)}
        />

        <div style={styles.notes}>
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