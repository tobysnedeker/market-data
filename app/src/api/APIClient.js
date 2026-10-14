import HttpClient from "./HttpClient";

const BASE_URL = "/api"

const getIntradayData = async (symbol) => {
  return HttpClient.get(`${BASE_URL}/intraday/${symbol}`);
}

const getMetadata = async (symbol) => {
  return HttpClient.get(`${BASE_URL}/intraday/metadata/${symbol}`);
}

export default {
  getIntradayData,
  getMetadata,
};