import { FaSave } from "react-icons/fa";

import { createConcert } from "./actions";

const Page = () => {
  return (
    <div className="px-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Create</h2>

      <form
        action={createConcert}
        className="bg-white border rounded-md p-8 shadow-sm w-full"
      >
        <div className="mb-6">
          <label
            htmlFor="concertName"
            className="block font-medium mb-2 text-gray-900"
          >
            Concert Name
          </label>
          <input
            id="concertName"
            name="concertName"
            type="text"
            placeholder="Please input concert name"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="totalSeat"
            className="block font-medium mb-2 text-gray-900"
          >
            Total Seats
          </label>
          <input
            id="totalSeat"
            name="totalSeat"
            type="number"
            placeholder="500"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block font-medium mb-2 text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Please input description"
            rows={5}
            required
            className="w-full border border-gray-300 rounded px-4 py-3 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center justify-center"
        >
          <FaSave className="mr-2" /> Save
        </button>
      </form>
    </div>
  );
};
export default Page;
