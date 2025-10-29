import { FaUser, FaTrash } from "react-icons/fa";
const sampleConcerts = [
  {
    id: 1,
    name: "Concert Name 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in.",
    seats: 500,
  },
  {
    id: 2,
    name: "Concert Name 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in.",
    seats: 200,
  },
];
const Page = () => {
  return (
    <div className="w-full">
      {sampleConcerts.map(({ id, name, description, seats }) => (
        <div key={id} className="border rounded-md p-4 mb-4 shadow-sm bg-white">
          <h3 className="text-blue-600 font-semibold mb-2 cursor-pointer hover:underline">
            {name}
          </h3>
          <p className="text-gray-700 mb-3">{description}</p>

          <div className="flex items-center justify-between text-gray-600 text-sm">
            <div className="flex items-center">
              <FaUser className="mr-1" />
              <span>{seats}</span>
            </div>

            <button
              type="button"
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Page;
