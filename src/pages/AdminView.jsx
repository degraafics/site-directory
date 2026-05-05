import MetricCards from '../components/MetricCards';
import SitesTable from '../components/SitesTable';

export default function AdminView({ sites, inactiveSites, sitesWithNoOwner, onEdit, onChangeOwner, onDelete, onAdd }) {
  return (
    <div style={{ padding: '32px 24px', maxWidth: '1440px', margin: '0 auto' }}>
      <MetricCards
        total={sites.length}
        actionNeeded={inactiveSites}
        noOwner={sitesWithNoOwner}
      />
      <SitesTable
        sites={sites}
        isAdmin={true}
        onEdit={onEdit}
        onChangeOwner={onChangeOwner}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </div>
  );
}