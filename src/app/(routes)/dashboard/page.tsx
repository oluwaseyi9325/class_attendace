"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { students as initialStudents } from "@/utils/data";
import Swal from "sweetalert2";
import Modal from "react-modal";
import barcode from "@/assets/barcode.png";


function DashboardPage() {
  type Attendance = {
    [key: number]: string;
  };

  type Student = {
    id: number;
    picture: string;
    fullname: string;
    level: string;
    course: string;
    dept: string;
  };

  const [attendance, setAttendance] = useState<Attendance>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);
  const [editStudentData, setEditStudentData] = useState<Student | null>(null);
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

    const storedStudents = JSON.parse(
      localStorage.getItem("students") || JSON.stringify(initialStudents)
    );
    setStudents(storedStudents);
  }, [router]);

  const registerAttendance = (studentId: number, studentName: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to register ${studentName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, register it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Processing",
          text: "Please wait...",
          imageUrl: barcode.src,
          imageWidth: 150,
          imageHeight: 150,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        setTimeout(() => {
          const today = new Date().toISOString().split("T")[0];
          const newAttendance = { ...attendance, [studentId]: today };

          setAttendance(newAttendance);
          localStorage.setItem("attendance", JSON.stringify(newAttendance));

          Swal.fire({
            icon: "success",
            title: "Registered",
            text: `${studentName} has been registered`,
          });
        }, 3000);
      }
    });
  };

  const openEditModal = (student: Student) => {
    setEditStudentData(student);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editStudentData) {
      setEditStudentData({
        ...editStudentData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveEditedStudent = () => {
    if (editStudentData) {
      const updatedStudents = students.map((student) =>
        student.id === editStudentData.id ? editStudentData : student
      );
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <div className="flex  justify-between">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Admin Dashboard
          </h1>
          <button 
         className="bg-blue-500 text-white px-2 sm:px-4 rounded hover:bg-blue-700 transition duration-200"
                      >
                       Add Student
                      </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-2 sm:px-4 border-b">Picture</th>
                <th className="py-2 px-2 sm:px-4 border-b">Full Name</th>
                <th className="py-2 px-2 sm:px-4 border-b">Level</th>
                <th className="py-2 px-2 sm:px-4 border-b">Course</th>
                <th className="py-2 px-2 sm:px-4 border-b">Department</th>
                <th className="py-2 px-2 sm:px-4 border-b">Actions</th>
                <th className="py-2 px-2 sm:px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    <Image
                      src={student.picture}
                      alt={student.fullname}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {student.fullname}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {student.level}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {student.course}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">{student.dept}</td>
                  <td className="py-2 px-2 sm:px-4 border-b flex space-x-2">
                    {attendance[student.id] ? (
                      <button
                        onClick={() => alert("Already registered")}
                        className="bg-yellow-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-yellow-700 transition duration-200"
                      >
                        Registered
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          registerAttendance(student.id, student.fullname)
                        }
                        className="bg-blue-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-blue-700 transition duration-200"
                      >
                        Mark Register
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(student)}
                      className="bg-green-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-green-700 transition duration-200"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Registration"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Registration</h2>
        <p>Are you sure you want to register this student?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
          <button
            // onClick={registerAttendance}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Student"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        {editStudentData && (
          <div>
            <label className="block mb-2">
              Full Name:
              <input
                type="text"
                name="fullname"
                value={editStudentData.fullname}
                onChange={handleEditChange}
                className="border rounded py-2 px-3 w-full"
              />
            </label>
            <label className="block mb-2">
              Level:
              <input
                type="text"
                name="level"
                value={editStudentData.level}
                onChange={handleEditChange}
                className="border rounded py-2 px-3 w-full"
              />
            </label>
            <label className="block mb-2">
              Course:
              <input
                type="text"
                name="course"
                value={editStudentData.course}
                onChange={handleEditChange}
                className="border rounded py-2 px-3 w-full"
              />
            </label>
            <label className="block mb-2">
              Department:
              <input
                type="text"
                name="dept"
                value={editStudentData.dept}
                onChange={handleEditChange}
                className="border rounded py-2 px-3 w-full"
              />
            </label>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DashboardPage;
