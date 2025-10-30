"use client";

import Link from "next/link";

import { redirect } from "next/navigation";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  FaHome,
  FaHistory,
  FaUserAlt,
  FaSignOutAlt,
  FaUsers,
  FaTrashAlt,
} from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [role, setRole] = useState("admin");
  const toggleRole = () => {
    const newRole = role === "admin" ? "user" : "admin";

    setRole(newRole);

    newRole === "admin" ? redirect("/admin/home/overview") : redirect("/user");
  };
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 antialiased">
        {" "}
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-100  p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-8">
                {role === "admin" ? "Admin" : "User"}
              </h2>
              <nav className="space-y-4">
                <Link href={role === "admin" ? "/admin/home" : "/user"}>
                  <button className="flex items-center space-x-3 text-blue-600 font-medium">
                    <FaHome /> <span>Home</span>
                  </button>
                </Link>

                <Link href="/admin/history">
                  <button className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                    <FaHistory /> <span>History</span>
                  </button>
                </Link>

                <button
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                  onClick={toggleRole}
                >
                  <FaUserAlt />{" "}
                  <span>
                    {role === "admin"
                      ? "Switch to User"
                      : "Switch to Admin"}{" "}
                  </span>
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
      </body>
    </html>
  );
}
