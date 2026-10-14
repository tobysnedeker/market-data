import { Router } from "express";

const router = Router();

const YAHOO_BASE_URL = new URL("https://query1.finance.yahoo.com/v8/finance/chart");
const HEADERS = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }

router.get('/intraday/:symbol', async (req, res) => {

  const url = new URL(`${YAHOO_BASE_URL}/${req.params.symbol.toUpperCase()}`);
  url.search = new URLSearchParams({
    range: "1mo",
    interval: "15m",
  });

  try {
    const response = await fetch(url, {
      headers: HEADERS,
    });

    if (!response.ok) {
      if (response.status == 404) {
        return res.status(404).json({
          error: `Symbol ${req.params.symbol} not found.`
        });
      } else {
        return res.status(500).json({
          error: 'Data provider error.'
        });
      }
    }

    const yahooResponse = await response.json();
    return res.status(200).json(groupByDay(yahooResponse));

  } catch (error) {
    console.error("Error: ", error);
  }




});

export function groupByDay(yahooResponse) {
  const result = yahooResponse?.chart?.result?.[0];
  if (!result?.timestamp) return [];

  const { exchangeTimezoneName } = result.meta;
  const { low, high, volume } = result.indicators.quote[0];

  // en-CA formats dates as YYYY-MM-DD; timeZone handles DST correctly
  const dayFormat = new Intl.DateTimeFormat("en-CA", {
    timeZone: exchangeTimezoneName,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const days = new Map();

  result.timestamp.forEach((ts, i) => {
    // skip null candles and zero-volume bars
    if (low[i] == null || high[i] == null || !volume[i]) return;

    const day = dayFormat.format(new Date(ts * 1000));
    const d = days.get(day) ?? { lowSum: 0, highSum: 0, count: 0, volume: 0 };
    d.lowSum += low[i];
    d.highSum += high[i];
    d.volume += volume[i];
    d.count += 1;
    days.set(day, d);
  });

  const round4 = (n) => Math.round(n * 1e4) / 1e4;

  return [...days.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, d]) => ({
      day,
      lowAverage: round4(d.lowSum / d.count),
      highAverage: round4(d.highSum / d.count),
      volume: d.volume,
    }));
}

export default router;