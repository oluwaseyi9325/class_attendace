"use client";

import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLecturer");
    localStorage.removeItem("lecturer");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("admin");
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Online Class Attendance</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
