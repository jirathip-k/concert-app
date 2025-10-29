"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Determine which tab is active by pathname
  const isActive = (tabPath: string) => pathname?.includes(tabPath);
  return (
    <div>
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow text-center flex flex-col items-center justify-center">
          <FaUser className="text-4xl mb-2" />
          <p>Total of seats</p>
          <h2 className="text-3xl font-bold mt-2">500</h2>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow text-center flex flex-col items-center justify-center">
          <FaCheckCircle className="text-4xl mb-2" />
          <p>Reserve</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow text-center flex flex-col items-center justify-center">
          <FaTimesCircle className="text-4xl mb-2" />
          <p>Cancel</p>
          <h2 className="text-3xl font-bold mt-2">12</h2>
        </div>
      </div>

      {/* Tab */}
      <div>
        <nav className="border-b mb-4 flex space-x-8">
          <Link
            href="/admin/home/overview"
            className={`pb-2 ${
              isActive("/overview")
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Overview
          </Link>
          <Link
            href="/admin/home/create"
            className={`pb-2 ${
              isActive("/create")
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Create
          </Link>
        </nav>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
