"use client";
import { FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { reserveConcert } from "./actions";
import { useState } from "react";
import { useConcerts } from "@/context/concert";

const Page = () => {
  const userId = 10000;

  const { concerts } = useConcerts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleReserve = async (concertId: number, action: string) => {
    try {
      setLoading(true);
      setError("");

      // Send a POST request to the server-side endpoint
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          concertId,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Handle success (e.g., show a success message or update UI)
      console.log("Reservation successful", data);
    } catch (err) {
      // Handle error (e.g., show error message to user)
      setError("Failed to reserve concert: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const checkIfReserved = (reservations: Array<any>) => {
    return reservations.some(
      (reservation) => reservation.action === "reserved",
    );
  };

  return (
    <div className="w-full">
      {concerts.map(({ id, name, description, seats, reservations }) => {
        const isReserved = checkIfReserved(reservations);
        return (
          <div
            key={id}
            className="border border-gray-100  rounded-md p-4 mb-4 shadow-sm bg-white"
          >
            <h3 className="text-blue-600 font-semibold mb-2 cursor-pointer hover:underline">
              {name}
            </h3>
            <p className="text-gray-700 mb-3">{description}</p>

            <div className="flex items-center justify-between text-gray-600 text-sm">
              <div className="flex items-center">
                <FaUser className="mr-1" />
                <span>{seats}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded text-sm flex items-center text-white bg-green-500 hover:bg-green-600"
                  onClick={() =>
                    handleReserve(id, isReserved ? "canceled" : "reserved")
                  }
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : isReserved
                      ? "Cancel Reservation"
                      : "Reserve"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Page;
