import { useState } from "react";
import "./Header.css";

export default function Header({ symbol, onLoad }) {
  const [input, setInput] = useState(symbol);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoad(input);
  };

  return (
    <header className="top">
      <img className="logo" src="/logo.webp"/>
      <div className="content">
        <h1>{symbol} Daily Range</h1>
        <form onSubmit={handleSubmit} className="search">
          <label htmlFor="symbol" className="sr">Stock symbol</label>
          <input
            id="symbol"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. TSLA"
            autoComplete="off"
          />
          <button type="submit">Load</button>
        </form>
      </div>
    </header>
  );
}
