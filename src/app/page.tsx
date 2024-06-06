"use client";

import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
        <p className="mb-6">Please log in to access the admin dashboard.</p>
        <button
          onClick={goToLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Home;
