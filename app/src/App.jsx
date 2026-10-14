import { useCallback, useEffect, useState } from 'react';
import APIClient from './api/APIClient';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header'
import MarketDataBody from "./components/MarketDataBody";
import './App.css'






function App() {
  const [symbol, setSymbol] = useState("TSLA");
  const [rows, setRows] = useState([]);
  const [metadata, setMetadata] = useState({});

  const loadSymbol = useCallback(async (nextSymbol) => {
    try {
      const nextSymbolUpper = nextSymbol.toUpperCase();
      const intradayResponse = await APIClient.getIntradayData(nextSymbolUpper);
      const nextRows = intradayResponse.data ?? intradayResponse;

      if (!nextRows.length) return;

      const metadataResponse = await APIClient.getMetadata(nextSymbolUpper);
      const nextMetadata = metadataResponse.data ?? metadataResponse;

      if (!nextMetadata || Object.keys(nextMetadata).length === 0) return;

      setSymbol(nextSymbolUpper);
      setRows(nextRows);
      setMetadata(nextMetadata);
    } catch {
      // Keep the last successful symbol and rows.
    }
  }, []);

  useEffect(() => {
    loadSymbol("TSLA");
  }, [loadSymbol]);

  return (
    <main>
      <Header symbol={symbol} onLoad={loadSymbol} />
      <MarketDataBody symbol={symbol} rows={rows} metadata={metadata} />
    </main>
  )
}

export default App
