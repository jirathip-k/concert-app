import Link from "next/link";
import { FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ConcertProvider } from "@/context/concert";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`, {
    cache: "no-store", // optional: always fresh data
  });
  const concerts = await res.json();

  // Compute total seats
  const totalSeats = concerts.reduce(
    (sum: number, c: any) => sum + c.totalSeats,
    0,
  );
  const reserved = concerts.reduce((count, concert) => {
    return (
      count + concert.reservations.filter((r) => r.action === "reserved").length
    );
  }, 0);
  const canceled = concerts.reduce((count, concert) => {
    return (
      count + concert.reservations.filter((r) => r.action === "canceled").length
    );
  }, 0);

  return (
    <ConcertProvider concerts={concerts}>
      <div>
        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow text-center flex flex-col items-center justify-center">
            <FaUser className="text-4xl mb-2" />
            <p>Total of seats</p>
            <h2 className="text-3xl font-bold mt-2">{totalSeats}</h2>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow text-center flex flex-col items-center justify-center">
            <FaCheckCircle className="text-4xl mb-2" />
            <p>Reserve</p>
            <h2 className="text-3xl font-bold mt-2">{reserved}</h2>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow text-center flex flex-col items-center justify-center">
            <FaTimesCircle className="text-4xl mb-2" />
            <p>Cancel</p>
            <h2 className="text-3xl font-bold mt-2">{canceled}</h2>
          </div>
        </div>

        {/* Tabs */}
        <nav className="border-b mb-4 flex space-x-8">
          <Link
            href="/admin/home/overview"
            className="pb-2 text-gray-600 hover:text-blue-500"
          >
            Overview
          </Link>
          <Link
            href="/admin/home/create"
            className="pb-2 text-gray-600 hover:text-blue-500"
          >
            Create
          </Link>
        </nav>

        <div>{children}</div>
      </div>
    </ConcertProvider>
  );
};

export default Layout;
