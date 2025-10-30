"use client";

import { FaUser, FaTrash } from "react-icons/fa";
import { useConcerts } from "@/context/concert";
import { deleteConcert } from "./actions";

const Page = () => {
  const { concerts } = useConcerts();
  return (
    <div className="w-full">
      {concerts.map(({ id, name, description, seats }) => (
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
            <form action={() => deleteConcert(id)}>
              <button
                type="submit"
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Page;
