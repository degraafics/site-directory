import { useState, useEffect } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: '#fff',
    borderRadius: '8px',
    padding: '28px',
    width: '440px',
    maxWidth: '95vw',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '18px',
    color: '#1a1a1a',
  },
  field: { marginBottom: '14px' },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#555',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  input: {
    width: '100%',
    height: '36px',
    padding: '0 10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#1a1a1a',
    outline: 'none',
    background: '#fff',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '20px',
  },
  btnCancel: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    background: '#fff',
    border: '1px solid #ccc',
    color: '#333',
  },
  btnBlue: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    background: '#005CB9',
    border: 'none',
    color: '#fff',
  },
  btnRed: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    background: '#c62828',
    border: 'none',
    color: '#fff',
  },
  btnGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    background: '#2E7D32',
    border: 'none',
    color: '#fff',
  },
  warningText: {
    fontSize: '13px',
    color: '#555',
    lineHeight: 1.6,
    marginBottom: '8px',
  },
};

function Overlay({ onClose, children }) {
  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        {children}
      </div>
    </div>
  );
}

export function EditModal({ site, onSave, onClose }) {
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    if (site) setForm({ name: site.name });
  }, [site]);

  if (!site) return null;

  return (
    <Overlay onClose={onClose}>
      <div style={styles.title}>Edit — {site.name}</div>

      <div style={styles.field}>
        <label style={styles.label}>Site Name</label>
        <input
          style={styles.input}
          value={form.name}
          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>URL</label>
        <div style={{
          height: '36px',
          padding: '0 10px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#999',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
          {site.url}
        </div>
        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
          URL changes must be made in SharePoint Admin Center
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Storage Size</label>
        <div style={{
          height: '36px',
          padding: '0 10px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#999',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
        }}>
          {site.storage}
        </div>
        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
          Storage data is managed by Microsoft and updated automatically
        </div>
      </div>

      <div style={styles.actions}>
        <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
        <div style={styles.btnBlue} role="button" tabIndex={0} onClick={() => onSave(site.id, form)}>Save Changes</div>
      </div>
    </Overlay>
  );
}

export function ChangeOwnerModal({ site, onClose }) {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');

  if (!site) return null;

  return (
    <Overlay onClose={onClose}>
      <div style={styles.title}>Change Owner — {site.name}</div>
      <div style={styles.field}>
        <label style={styles.label}>New Owner Email</label>
        <input style={styles.input} placeholder="user@andrew.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Reason for Change</label>
        <input style={styles.input} placeholder="Optional" value={reason} onChange={e => setReason(e.target.value)} />
      </div>
      <div style={styles.actions}>
        <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
        <div style={styles.btnBlue} role="button" tabIndex={0} onClick={() => { alert('Ownership change request submitted. IT will review within 2 business days.'); onClose(); }}>Submit Request</div>
      </div>
    </Overlay>
  );
}

export function DeleteModal({ site, onConfirm, onClose }) {
  if (!site) return null;

  return (
    <Overlay onClose={onClose}>
      <div style={styles.title}>Delete Site</div>
      <p style={styles.warningText}>
        Are you sure you want to delete <strong>{site.name}</strong>? This is permanent and cannot be undone.
      </p>
      <div style={styles.actions}>
        <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
        <div style={styles.btnRed} role="button" tabIndex={0} onClick={() => onConfirm(site.id)}>Delete Site</div>
      </div>
    </Overlay>
  );
}

export function AddModal({ onSave, onClose }) {
  const [form, setForm] = useState({ name: '', url: 'https://andrew.sharepoint.com/sites/', storage: '0 MB', accessed: 'Just now' });

  return (
    <Overlay onClose={onClose}>
      <div style={styles.title}>Request New Site</div>
      <div style={styles.field}>
        <label style={styles.label}>Site Name</label>
        <input style={styles.input} value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>URL</label>
        <input style={styles.input} value={form.url} onChange={e => setForm(prev => ({ ...prev, url: e.target.value }))} />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Business Justification</label>
        <input style={styles.input} placeholder="Optional" />
      </div>
      <div style={styles.actions}>
        <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
        <div style={styles.btnGreen} role="button" tabIndex={0} onClick={() => onSave(form)}>Submit Request</div>
      </div>
    </Overlay>
  );
}