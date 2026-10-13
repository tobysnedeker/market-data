import express from "express";
import marketDataRoutes from './routes/marketDataRoutes.js';

const PORT = 5555;
const ADDRESS = 'localhost';
const API_BASE = "/api";

const server = express();

server.use(API_BASE, marketDataRoutes);

server.listen(PORT, ADDRESS, () => {
  console.log(`API listening on http://${ADDRESS}:${PORT}`);
});
