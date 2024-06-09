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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-6">Please select your login type to access the dashboard.</p>
        <div className="space-y-4">
          <button
            onClick={goToAdminLogin}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            Admin Login
          </button>
          <button
            onClick={goToLecturerLogin}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200 w-full"
          >
            Lecturer Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
