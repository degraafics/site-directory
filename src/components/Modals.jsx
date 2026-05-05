import { useState, useEffect } from 'react';
import { submitRequest } from '../services/requests';

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
  inputFocus: { borderColor: '#005CB9' },
  readOnly: {
    width: '100%',
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
  },
  readOnlyHint: {
    fontSize: '11px',
    color: '#999',
    marginTop: '4px',
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
  btnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  confirmation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 0 4px',
    textAlign: 'center',
    gap: '12px',
  },
  confirmIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#f0fdf4',
    border: '2px solid #86efac',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
  },
  confirmTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  confirmBody: {
    fontSize: '13px',
    color: '#555',
    lineHeight: 1.6,
    maxWidth: '320px',
  },
  warningText: {
    fontSize: '13px',
    color: '#555',
    lineHeight: 1.6,
    marginBottom: '8px',
  },
  errorText: {
    fontSize: '12px',
    color: '#c62828',
    marginTop: '8px',
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

function ConfirmationMessage({ type, onClose }) {
  return (
    <div style={styles.confirmation}>
      <div style={styles.confirmIcon}>✓</div>
      <div style={styles.confirmTitle}>Request Submitted</div>
      <div style={styles.confirmBody}>
        Your <strong>{type}</strong> request has been submitted and is pending review.
        The site administrators will be notified and will follow up with you shortly.
      </div>
      <div style={{ ...styles.actions, justifyContent: 'center', marginTop: '8px' }}>
        <div style={styles.btnBlue} role="button" tabIndex={0} onClick={onClose}>Done</div>
      </div>
    </div>
  );
}

export function EditModal({ site, onSave, onClose }) {
  const [form, setForm] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (site) setForm({ name: site.name });
  }, [site]);

  if (!site) return null;

  async function handleSave() {
    if (!form.name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitRequest({
        type: 'Edit Site Name',
        site,
        details: {
          'Current Name': site.name,
          'Requested Name': form.name,
        },
      });
      onSave(site.id, form);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Overlay onClose={onClose}>
      {submitted ? (
        <ConfirmationMessage type="Edit Site Name" onClose={onClose} />
      ) : (
        <>
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
            <div style={styles.readOnly}>{site.url}</div>
            <div style={styles.readOnlyHint}>URL changes must be made in SharePoint Admin Center</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Storage Size</label>
            <div style={styles.readOnly}>{site.storage}</div>
            <div style={styles.readOnlyHint}>Storage data is managed by Microsoft automatically</div>
          </div>

          {error && <div style={styles.errorText}>{error}</div>}

          <div style={styles.actions}>
            <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
            <div
              style={{ ...styles.btnBlue, ...(submitting ? styles.btnDisabled : {}) }}
              role="button"
              tabIndex={0}
              onClick={!submitting ? handleSave : undefined}
            >
              {submitting ? 'Submitting…' : 'Save Changes'}
            </div>
          </div>
        </>
      )}
    </Overlay>
  );
}

export function ChangeOwnerModal({ site, onClose }) {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!site) return null;

  async function handleSubmit() {
    if (!email.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitRequest({
        type: 'Change Owner',
        site,
        details: {
          'New Owner Email': email,
          'Reason': reason || 'Not provided',
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Overlay onClose={onClose}>
      {submitted ? (
        <ConfirmationMessage type="Change Owner" onClose={onClose} />
      ) : (
        <>
          <div style={styles.title}>Change Owner — {site.name}</div>
          <div style={styles.field}>
            <label style={styles.label}>New Owner Email</label>
            <input
              style={styles.input}
              placeholder="user@andrew.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Reason for Change</label>
            <input
              style={styles.input}
              placeholder="Optional"
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </div>
          {error && <div style={styles.errorText}>{error}</div>}
          <div style={styles.actions}>
            <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
            <div
              style={{ ...styles.btnBlue, ...(submitting ? styles.btnDisabled : {}) }}
              role="button"
              tabIndex={0}
              onClick={!submitting ? handleSubmit : undefined}
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
            </div>
          </div>
        </>
      )}
    </Overlay>
  );
}

export function DeleteModal({ site, onConfirm, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!site) return null;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await submitRequest({
        type: 'Delete Site',
        site,
        details: {
          'Site Name': site.name,
          'Site URL': site.url,
          'Storage': site.storage,
          'Last Accessed': site.accessed,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Overlay onClose={onClose}>
      {submitted ? (
        <ConfirmationMessage type="Delete Site" onClose={onClose} />
      ) : (
        <>
          <div style={styles.title}>Request Site Deletion</div>
          <p style={styles.warningText}>
            You are requesting deletion of <strong>{site.name}</strong>.
            This request will be reviewed by an administrator before any action is taken.
          </p>
          {error && <div style={styles.errorText}>{error}</div>}
          <div style={styles.actions}>
            <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
            <div
              style={{ ...styles.btnRed, ...(submitting ? styles.btnDisabled : {}) }}
              role="button"
              tabIndex={0}
              onClick={!submitting ? handleSubmit : undefined}
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
            </div>
          </div>
        </>
      )}
    </Overlay>
  );
}

export function AddModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    url: 'https://andrew.sharepoint.com/sites/',
    justification: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!form.name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitRequest({
        type: 'New Site Request',
        site: { name: form.name, url: form.url },
        details: {
          'Requested Site Name': form.name,
          'Requested URL': form.url,
          'Business Justification': form.justification || 'Not provided',
        },
      });
      onSave({ ...form, storage: '0 MB', accessed: 'Just now', numOwners: 0, actionNeeded: false });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Overlay onClose={onClose}>
      {submitted ? (
        <ConfirmationMessage type="New Site Request" onClose={onClose} />
      ) : (
        <>
          <div style={styles.title}>Request New Site</div>
          <div style={styles.field}>
            <label style={styles.label}>Site Name</label>
            <input
              style={styles.input}
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Requested URL</label>
            <input
              style={styles.input}
              value={form.url}
              onChange={e => setForm(prev => ({ ...prev, url: e.target.value }))}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Business Justification</label>
            <input
              style={styles.input}
              placeholder="Optional"
              value={form.justification}
              onChange={e => setForm(prev => ({ ...prev, justification: e.target.value }))}
            />
          </div>
          {error && <div style={styles.errorText}>{error}</div>}
          <div style={styles.actions}>
            <div style={styles.btnCancel} role="button" tabIndex={0} onClick={onClose}>Cancel</div>
            <div
              style={{ ...styles.btnGreen, ...(submitting ? styles.btnDisabled : {}) }}
              role="button"
              tabIndex={0}
              onClick={!submitting ? handleSubmit : undefined}
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
            </div>
          </div>
        </>
      )}
    </Overlay>
  );
}