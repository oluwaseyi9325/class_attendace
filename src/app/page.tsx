"use client";

import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const goToAdminLogin = () => {
    router.push("/admin/signin");
  };

  const goToLecturerLogin = () => {
    router.push("/lecturer/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome</h1>
        <p className="mb-8 text-gray-600">
          Please select your login type to access the dashboard.
        </p>
        <div className="space-y-6">
          <div
            onClick={goToAdminLogin}
            className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-full text-center"
          >
            <div className="text-2xl font-semibold mb-2">Admin Login</div>
            <p className="text-sm">Access admin dashboard</p>
          </div>
          <div
            onClick={goToLecturerLogin}
            className="cursor-pointer bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-full text-center"
          >
            <div className="text-2xl font-semibold mb-2">Lecturer Login</div>
            <p className="text-sm">Access lecturer dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
