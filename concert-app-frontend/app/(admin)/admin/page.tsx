const Page = () => {
  return (
    <div>
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow text-center">
          <p>Total of seats</p>
          <h2 className="text-3xl font-bold mt-2">500</h2>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow text-center">
          <p>Reserve</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow text-center">
          <p>Cancel</p>
          <h2 className="text-3xl font-bold mt-2">12</h2>
        </div>
      </div>

      {/* Example page content */}
      <p className="text-gray-700">Hello from admin</p>
    </div>
  );
};
export default Page;
