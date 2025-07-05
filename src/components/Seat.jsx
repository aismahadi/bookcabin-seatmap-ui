import React from "react";

// Stylable SVG icon
const SeatIcon = ({ color = "text-gray-400" }) => (
  <svg
    className={`w-5 h-5 ${color}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7 13V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9h1a1 1 0 0 1 1 1v5h-2v-4H8v4H6v-5a1 1 0 0 1 1-1h1zM9 4h6v9H9V4z" />
  </svg>
);

const Seat = ({ seat, onClick, isSelected }) => {
  const code = seat.code;
  const storefrontCode = seat.storefrontSlotCode;
  const isHeader = storefrontCode === "HEADER";
  const isBlank = storefrontCode === "BLANK" || !code;
  const notes = (storefrontCode === "WING") ? "🪽" : "";

  if (isHeader) {
    if (typeof code === "string" && code.trim().length === 1) {
      return (
        <div
          className="w-10 h-10 m-1 flex items-center justify-center text-gray-500"
          title={code}
        >
          {code}
        </div>
      );
    }
    return <div className="w-10 h-10 m-1" />;
  }

  if (isBlank) {
    return (
      <div className="w-10 h-10 m-1 flex items-center justify-center">
        {notes}
      </div>
    );
  }

  let iconColor = "text-gray-400";
  if (!seat.available) iconColor = "text-red-500";
  else if (seat.freeOfCharge) iconColor = "text-blue-500";
  else iconColor = "text-green-500";

  const handleClick = () => {
    if (seat.available && onClick) {
      onClick(seat);
    }
  };

  return (
    <div
      onClick={handleClick}
      title={seat.code}
      className={`w-10 h-10 m-1 bg-white flex items-center justify-center rounded cursor-pointer hover:scale-105 transition 
        ${isSelected ? "border-4 border-green-600" : "border border-gray-300"}
      `}
    >
      <SeatIcon color={iconColor} />
    </div>
  );
};

export default Seat;
