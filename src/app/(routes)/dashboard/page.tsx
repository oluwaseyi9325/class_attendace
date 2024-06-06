"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from 'sweetalert2';

function DashboardPage() {
  type Student = {
    id: number;
    fullname: string;
    level: string;
    course: string;
    dept: string;
    picture: string;
  };

  type Attendance = {
    [key: number]: string;
  };

  const students: Student[] = [
    {
      id: 1,
      fullname: "John Doe",
      level: "100",
      course: "Computer Science",
      dept: "Engineering",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      fullname: "Jane Smith",
      level: "200",
      course: "Mathematics",
      dept: "Science",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      fullname: "Alice Johnson",
      level: "300",
      course: "Physics",
      dept: "Science",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      fullname: "Bob Brown",
      level: "400",
      course: "Chemistry",
      dept: "Science",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      fullname: "Charlie Davis",
      level: "100",
      course: "Electrical Engineering",
      dept: "Engineering",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      fullname: "Dana White",
      level: "200",
      course: "Mechanical Engineering",
      dept: "Engineering",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      fullname: "Eve Black",
      level: "300",
      course: "Civil Engineering",
      dept: "Engineering",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      fullname: "Frank Green",
      level: "400",
      course: "Architecture",
      dept: "Architecture",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      fullname: "Grace Hall",
      level: "100",
      course: "Biology",
      dept: "Science",
      picture: "https://via.placeholder.com/150",
    },
    {
      id: 10,
      fullname: "Hank Scott",
      level: "200",
      course: "History",
      dept: "Arts",
      picture: "https://via.placeholder.com/150",
    },
  ];

  const [attendance, setAttendance] = useState<Attendance>({});
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/signin");
    }

    const storedAttendance = JSON.parse(
      localStorage.getItem("attendance") || "{}"
    );
    setAttendance(storedAttendance);
  }, [router]);


const registerAttendance = (studentId: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to register this student.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, register it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const today = new Date().toISOString().split('T')[0];
                const newAttendance = { ...attendance, [studentId]: today };

                setAttendance(newAttendance);
                localStorage.setItem('attendance', JSON.stringify(newAttendance));

                Swal.fire({
                    icon: 'success',
                    title: 'Registered',
                    text: 'Student has been registered',
                });
            }
        });
    };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Picture</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Level</th>
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Actions</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="py-2 px-4 border-b">
    <Image
        src={student.picture}
        alt={student.fullname}
        width={48} // Adjust width as needed
        height={48} // Adjust height as needed
        className="rounded-full"
    />
</td>

                <td className="py-2 px-4 border-b">{student.fullname}</td>
                <td className="py-2 px-4 border-b">{student.level}</td>
                <td className="py-2 px-4 border-b">{student.course}</td>
                <td className="py-2 px-4 border-b">{student.dept}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => registerAttendance(student.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Mark Register
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  {attendance[student.id] ? (
                    <span className="text-green-500">
                      Registered on {attendance[student.id]}
                    </span>
                  ) : (
                    <span className="text-red-500">Not Registered</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
