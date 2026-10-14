import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import APIClient from "../api/APIClient";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Chart.css";

const sharedChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: { color: "#d8dbe2" },
    },
  },
  scales: {
    x: {
      ticks: { color: "#aeb3bf" },
      grid: { color: "rgb(255 255 255 / 6%)" },
      border: { color: "rgb(255 255 255 / 12%)" },
    },
    y: {
      ticks: { color: "#aeb3bf" },
      grid: { color: "rgb(255 255 255 / 6%)" },
      border: { color: "rgb(255 255 255 / 12%)" },
      beginAtZero: false,
    },
  },
};

const averagesChartOptions = {
  ...sharedChartOptions,
  aspectRatio: 1.75,
  plugins: {
    ...sharedChartOptions.plugins,
    title: {
      display: true,
      text: "Daily average price range (USD)",
      color: "#d8dbe2",
    },
  },
  scales: {
    ...sharedChartOptions.scales,
    y: {
      ...sharedChartOptions.scales.y,
      title: {
        display: true,
        text: "Price (USD)",
        color: "#aeb3bf",
      },
    },
  },
};

const volumeChartOptions = {
  ...sharedChartOptions,
  aspectRatio: 2.25,
  plugins: {
    ...sharedChartOptions.plugins,
    title: {
      display: true,
      text: "Daily trading volume (shares)",
      color: "#d8dbe2",
    },
  },
  scales: {
    ...sharedChartOptions.scales,
    y: {
      ...sharedChartOptions.scales.y,
      title: {
        display: true,
        text: "Volume (shares)",
        color: "#aeb3bf",
      },
    },
  },
};

export default function Chart({ rows }) {
  const chartRows = rows;
  const labels = chartRows.map((row) => row.day);

  const averagesData = {
    labels,
    datasets: [
      {
        label: "Average low-high range",
        data: chartRows.map(({ lowAverage, highAverage }) => [
          lowAverage,
          highAverage,
        ]),
        backgroundColor: "rgba(54, 162, 235, 0.55)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        barThickness: 10,
        maxBarThickness: 14,
      },
    ],
  };

  const volumeData = {
    labels,
    datasets: [
      {
        label: "Volume",
        data: chartRows.map((row) => row.volume),
        backgroundColor: "rgba(75, 192, 120, 0.6)",
      },
    ],
  };

  return (
    <div className="chart-page">
      <section className="averages-chart">
        <Bar data={averagesData} options={averagesChartOptions} />
      </section>

      <section className="volume-chart">
        <Bar data={volumeData} options={volumeChartOptions} />
      </section>
    </div>
  );
}
