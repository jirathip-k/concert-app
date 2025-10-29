"use client";
import { useState } from "react";
import { FaSave } from "react-icons/fa";

const Page = () => {
  const [form, setForm] = useState({
    concertName: "",
    totalSeat: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submit logic here
    alert(`Saved: ${form.concertName} with ${form.totalSeat} seats`);
  };
  return (
    <div className="px-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Create</h2>

      <form
        onSubmit={handleSubmit}
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
            value={form.concertName}
            onChange={handleChange}
            placeholder="Please input concert name"
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="totalSeat"
            className="block font-medium mb-2 text-gray-900"
          >
            Total of seat
          </label>
          <input
            id="totalSeat"
            name="totalSeat"
            type="number"
            value={form.totalSeat}
            onChange={handleChange}
            placeholder="500"
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={form.description}
            onChange={handleChange}
            placeholder="Please input description"
            rows={5}
            className="w-full border border-gray-300 rounded px-4 py-3 resize-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
