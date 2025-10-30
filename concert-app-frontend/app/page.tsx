import { FaSave } from "react-icons/fa";
import { createUser } from "./actions";

const Page = () => {
  return (
    <div className="px-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Create User</h2>

      <form
        action={createUser}
        className="bg-white border rounded-md p-8 shadow-sm w-full"
      >
        {/* Username Field */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block font-medium mb-2 text-gray-900"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Please input username"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block font-medium mb-2 text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Please input password"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block font-medium mb-2 text-gray-900"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
