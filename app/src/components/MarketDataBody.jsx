import Chart from "./Chart";
import InfoPanel from "./InfoPanel";
import "./MarketDataBody.css";

export default function MarketDataBody({ symbol, rows, metadata }) {
  return (
    <div className="market-data-body">
      <InfoPanel symbol={symbol} metadata={metadata} />
      <Chart rows={rows} />
    </div>
  );
}