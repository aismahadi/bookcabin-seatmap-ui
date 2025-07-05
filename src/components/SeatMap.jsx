import React, { useEffect, useState } from "react";
import axios from "axios";
import Seat from "./Seat";
import Legend from "./Legend";
import Flight from "./Flight";

const SeatMap = () => {
  const [seatData, setSeatData] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/seatmap")
      .then((res) => setSeatData(res.data))
      .catch(console.error);
  }, []);

  if (!seatData) return <div className="p-6 text-lg">Loading seat map...</div>;

  const aircraft = seatData.aircraft;
  const deck = seatData.cabins?.[0]?.deck ?? "MAIN";

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">

        {/* Row 1: Flight + Legend */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <Flight aircraft={aircraft} deck={deck} />
          <div className="w-full lg:w-64">
            <div className="bg-white border shadow rounded-lg p-4">
              <h4 className="text-md font-semibold mb-3 text-gray-800 border-b pb-1">Seat Legend</h4>
              <Legend />
            </div>
          </div>
        </div>

        {/* Row 2: Selected Seat Detail */}
        <div className="bg-white border p-4 rounded-lg shadow-sm text-sm text-gray-700">
          <span className="font-medium">Selected Seat:</span>{" "}
          {selectedSeat
            ? <span className="text-gray-900 font-semibold">
                {selectedSeat.code} — {selectedSeat.prices?.alternatives?.[0]?.[0]?.amount} {selectedSeat.prices?.alternatives?.[0]?.[0]?.currency}
              </span>
            : <span className="italic text-gray-500">None</span>
          }
        </div>

        {/* Row 3: Seat Map */}
        <div className="overflow-x-auto">
          {seatData.cabins.map((cabin, i) => (
            <div key={i}>
              {cabin.seatRows.map((row) => {
                if (row.rowNumber <= 0) {
                  return;
                }
                return (
                  <div key={row.rowNumber} className="flex mb-1 items-center">
                    <span className="w-16 text-right pr-2 font-mono text-gray-600">
                      {row.rowNumber}
                    </span>

                    {row.seats.map((seat, idx) => (
                      <Seat
                        key={idx}
                        seat={seat}
                        onClick={() =>
                          setSelectedSeat(
                            selectedSeat?.code === seat.code ? null : seat
                          )
                        }
                        isSelected={seat.code === selectedSeat?.code}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SeatMap;
