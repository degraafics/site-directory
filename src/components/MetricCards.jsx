export default function MetricCards({ total, actionNeeded, noOwner }) {
  const cards = [
    {
      num: total,
      label: 'Total Sites',
      sublabel: null,
    },
    {
      num: actionNeeded,
      label: 'Owner Action Needed',
      sublabel: 'Sites requiring attention',
    },
    {
      num: noOwner,
      label: 'Sites with No Owner',
      sublabel: 'Immediate action required',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '28px',
    }}>
      {cards.map((card, i) => (
        <div key={i} style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px 24px',
        }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
            {card.num}
          </div>
          <div style={{ fontSize: '13px', color: '#555', marginTop: '6px' }}>
            {card.label}
          </div>
          {card.sublabel && (
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
              {card.sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}