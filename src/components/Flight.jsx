import React from "react";

const Flight = ({ aircraft, deck }) => {
  return (
    <div className="bg-white border shadow rounded-lg p-4 w-full">
      <h4 className="text-md font-semibold mb-3 text-gray-800 border-b pb-1">Flight Information</h4>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="w-28 font-medium">Aircraft:</span>
          <span className="text-blue-600 font-semibold">{aircraft}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 font-medium">Cabin Deck:</span>
          <span className="text-indigo-600 font-semibold">{deck}</span>
        </div>
      </div>
    </div>
  );
};

export default Flight;
