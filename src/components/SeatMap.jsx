import React, { useEffect, useState } from "react";
import axios from "axios";
import Seat from "./Seat";
import Legend from "./Legend";
import Flight from "./Flight";
import Customer from "./Customer";

const SeatMap = () => {
  const [segmentData, setSegmentData] = useState(null);
  const [passangerData, setPassangerData] = useState(null);
  const [seatMapData, setSeatMapData] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/segment/738")
      .then((res) => setSegmentData(res.data))
      .catch(console.error);
    
    axios.get("http://localhost:8080/api/passenger/01.01")
      .then((res) => setPassangerData(res.data))
      .catch(console.error);

    axios.get("http://localhost:8080/api/seatmap/738")
      .then((res) => setSeatMapData(res.data))
      .catch(console.error);
  }, [], []);

  if (!segmentData || !passangerData || !seatMapData) return <div className="p-6 text-lg">Loading seat map...</div>;

  const segment = segmentData;
  const passanger = passangerData;
  const seatmap = seatMapData;
  console.log(seatmap);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Row 1: Flight + Customer + Legend */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <Flight segment={segment} />
          <Customer passanger={passanger} />
          <Legend />
        </div>

        <div className="sticky top-0 z-10 bg-gray-50 space-y-4 pb-2 pt-2">
          {/* Row 2: Selected Seat Detail */}
          <div className="bg-white border p-4 rounded-lg shadow-sm text-sm text-gray-700">
            <div className="flex flex-col items-center space-y-1">
              <span className="font-medium">Selected Seat:</span>{" "}
              {selectedSeat
                ? <span className="text-indigo-600 font-semibold">
                    {selectedSeat.code} — {selectedSeat.prices?.alternatives?.[0]?.[0]?.amount} {selectedSeat.prices?.alternatives?.[0]?.[0]?.currency}
                  </span>
                : <span className="italic text-indigo-600">None</span>
              }
            </div>
          </div>
          
          {/* Row 3: Seat Column Header (rendered only once using first cabin) */}
          <div className="overflow-x-auto">
            <div className="flex flex-col items-center space-y-1">
              {seatmap.cabins.length > 0 && (
                <div className="flex items-center mb-1">
                  <span className="w-16 pr-2 font-mono text-xs text-gray-500"></span>
                  {seatmap.cabins[0].seatColumns.map((col, idx) => (
                    <Seat
                      key={`header-${idx}`}
                      seat={{
                        code: col || "",
                        available: false,
                        storefrontSlotCode: "HEADER",
                      }}
                      isSelected={false}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Seat Map */}
        <div className="overflow-x-auto">
          <div className="flex flex-col items-center space-y-1">
            {seatmap.cabins.map((cabin, i) => (
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
    </div>
  );
};

export default SeatMap;
