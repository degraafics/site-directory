import SitesTable from '../components/SitesTable';

export default function OwnerView({ sites, onEdit, onChangeOwner, onDelete, onAdd }) {
  return (
    <div style={{ padding: '32px 24px', maxWidth: '1240px', margin: '0 auto' }}>
      <SitesTable
        sites={sites}
        isAdmin={false}
        onEdit={onEdit}
        onChangeOwner={onChangeOwner}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </div>
  );
}