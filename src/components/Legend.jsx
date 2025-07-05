import React from "react";

const LegendItem = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-6 h-6 rounded bg-white border flex items-center justify-center ${color}`}>
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7 13V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9h1a1 1 0 0 1 1 1v5h-2v-4H8v4H6v-5a1 1 0 0 1 1-1h1zM9 4h6v9H9V4z" />
      </svg>
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

const Legend = () => (
  <div className="bg-white border shadow rounded-lg p-4 w-full">
    <h4 className="text-md font-semibold mb-3 text-gray-800 border-b pb-1">Seat Legend</h4>
      <div className="space-y-0">
        <LegendItem color="text-green-500" label="Available (Paid)" />
        <LegendItem color="text-blue-500" label="Available (Free)" />
        <LegendItem color="text-red-500" label="Unavailable" />
      </div>
  </div>
);

export default Legend;
