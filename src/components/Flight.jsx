import React from "react";

const Flight = ({ segment }) => {
  return (
    <div className="bg-white border shadow rounded-lg p-4 w-full">
      <h4 className="text-md font-semibold mb-3 text-gray-800 border-b pb-1">Flight Information</h4>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="w-28 font-medium">Aircraft:</span>
          <span className="text-green-600 font-semibold">{segment.equipment}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 font-medium">Class:</span>
          <span className="text-green-600 font-semibold">{segment.cabinClass}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 font-medium">Route:</span>
          <span className="text-green-600 font-semibold">{segment.origin} - {segment.destination}</span>
        </div>
      </div>
    </div>
  );
};

export default Flight;
