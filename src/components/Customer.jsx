import React from "react";

const Customer = ({ passanger }) => {
  return (
    <div className="bg-white border shadow rounded-lg p-4 w-full">
      <h4 className="text-md font-semibold mb-3 text-gray-800 border-b pb-1">Passanger Information</h4>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="w-28 font-medium">Number:</span>
          <span className="text-yellow-600 font-semibold">{passanger.passengerNumber}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 font-medium">Name:</span>
          <span className="text-yellow-600 font-semibold">{passanger.passengerDetails.firstName} {passanger.passengerDetails.lastName}</span>
        </div>
        <div className="flex items-center">
          <span className="w-28 font-medium">Gender:</span>
          <span className="text-yellow-600 font-semibold">{passanger.passengerInfo.gender}</span>
        </div>
      </div>
    </div>
  );
};

export default Customer;
