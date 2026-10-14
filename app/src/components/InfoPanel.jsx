const fields = [
  "Company",
  "Exchange",
  "Currency",
  "Last price",
  "Change",
  "Day range",
  "Volume",
  "52-week range",
];

export default function InfoPanel({ symbol, metadata }) {
  const formatRange = (range) =>
    range?.low == null || range?.high == null
      ? "—"
      : `${range.low} - ${range.high}`;

  const fields = [
    { label: "Company", value: metadata?.company },
    { label: "Exchange", value: metadata?.exchange },
    { label: "Currency", value: metadata?.currency },
    { label: "Last price", value: metadata?.lastPrice },
    {
      label: "Change",
      value:
        metadata?.changePercent == null
          ? undefined
          : `${metadata.changePercent}%`,
    },
    { label: "Day range", value: formatRange(metadata?.dayRange) },
    { label: "Volume", value: metadata?.volume?.toLocaleString() },
    {
      label: "52-week range",
      value: formatRange(metadata?.fiftyTwoWeekRange),
    },
  ];

  return (
    <div className="info-panel" aria-labelledby="info-panel-title">
      <h2 id="info-panel-title">{symbol} Overview</h2>
      <dl>
        {fields.map(({ label, value }) => (
          <div className="info-panel-row" key={label}>
            <dt>{label}</dt>
            <dd>{value ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}