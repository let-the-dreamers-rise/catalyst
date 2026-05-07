export function ProgressBar({ label, value, tone = "mint" }) {
  return (
    <div className="progress-row">
      <div className="progress-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-track">
        <div className={`progress-fill tone-${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

export function RadarChart({ metrics }) {
  const entries = Object.entries(metrics);
  const center = 55;
  const maxRadius = 42;
  const points = entries
    .map(([, value], index) => {
      const angle = -Math.PI / 2 + (index / entries.length) * Math.PI * 2;
      const radius = (value / 100) * maxRadius;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(" ");

  const gridRings = [0.35, 0.65, 1];

  return (
    <div className="radar-wrap" aria-label="Performance radar chart">
      <svg viewBox="0 0 110 110" role="img">
        {gridRings.map((ring) => (
          <polygon
            key={ring}
            points={entries
              .map(([,], index) => {
                const angle = -Math.PI / 2 + (index / entries.length) * Math.PI * 2;
                const radius = ring * maxRadius;
                return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
              })
              .join(" ")}
            className="radar-grid"
          />
        ))}
        {entries.map(([,], index) => {
          const angle = -Math.PI / 2 + (index / entries.length) * Math.PI * 2;
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * maxRadius}
              y2={center + Math.sin(angle) * maxRadius}
              className="radar-axis"
            />
          );
        })}
        <polygon points={points} className="radar-shape" />
      </svg>
      <div className="radar-legend">
        {entries.map(([key, value]) => (
          <span key={key}>
            {formatMetricLabel(key)} <strong>{value}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ComparisonBars({ candidate, records }) {
  const latest = records.find((record) => record.candidateId === candidate.id);
  const observedYield = latest?.observedYield ?? Math.max(candidate.predicted.yield - 8, 0);
  const rows = [
    ["Predicted yield", candidate.predicted.yield, "cyan"],
    ["Observed yield", observedYield, latest ? "mint" : "amber"],
    ["Selectivity", latest?.selectivity ?? candidate.predicted.selectivity, "amber"],
    ["Stability", candidate.predicted.stability, "rose"],
  ];

  return (
    <div className="comparison-bars">
      {rows.map(([label, value, tone]) => (
        <ProgressBar key={label} label={label} value={value} tone={tone} />
      ))}
    </div>
  );
}

export function DriftMatrix({ signals }) {
  return (
    <div className="drift-matrix">
      {signals.map((signal, index) => (
        <div
          key={signal.id}
          className="drift-cell"
          style={{ "--drift": signal.drift, "--delay": `${index * 80}ms` }}
        >
          <span>{signal.area}</span>
          <strong>{signal.drift}%</strong>
          <small>{signal.label}</small>
        </div>
      ))}
    </div>
  );
}

function formatMetricLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .replace("Carbon Efficiency", "Carbon eff.");
}
