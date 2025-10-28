import {
  FaHome,
  FaHistory,
  FaUserAlt,
  FaSignOutAlt,
  FaUsers,
  FaTrashAlt,
} from "react-icons/fa";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin</h2>
          <nav className="space-y-4">
            <button className="flex items-center space-x-3 text-blue-600 font-medium">
              <FaHome /> <span>Home</span>
            </button>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
              <FaHistory /> <span>History</span>
            </button>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
              <FaUserAlt /> <span>Switch to user</span>
            </button>
          </nav>
        </div>

        <button className="flex items-center space-x-3 text-red-500 hover:text-red-700">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};
export default Layout;
