"use client";
import { FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { reserveConcert } from "./actions";

import { useConcerts } from "@/context/concert";

const Page = () => {
  const { concerts } = useConcerts();
  const userId = 10000;

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
                {isReserved ? (
                  <form action={() => reserveConcert(userId, id, "canceled")}>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <form action={() => reserveConcert(userId, id, "reserved")}>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center"
                    >
                      Reserve
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Page;
