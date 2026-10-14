import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState(params.get("symbol") ?? "TSLA");
  const symbol = params.get("symbol") ?? "TSLA";

  const handleSubmit = (e) => {
    e.preventDefault();
    const symbol = input.trim().toUpperCase();
    if (symbol) setParams({ symbol });
  };

  return (
    <header className="top">
      <h1>{symbol} Daily Range</h1>
      <form onSubmit={handleSubmit} className="search">
        <label htmlFor="symbol" className="sr">Stock symbol</label>
        <input
          id="symbol"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. TSLA"
          autocomplete="off"
        />
        <button type="submit">Load</button>
      </form>
    </header>
  );
}
