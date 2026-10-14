import HttpClient from "./HttpClient";

const BASE_URL = "/api"

const getIntradayData = async (symbol) => {
  return HttpClient.get(`${BASE_URL}/intraday/${symbol}`);
}

export default {
  getIntradayData,
};