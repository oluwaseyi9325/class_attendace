"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { students as initialStudents } from "@/utils/data";
import Swal from "sweetalert2";
import barcode from "@/assets/barcode.png";
import EditModal from "@/components/EditModal";
import AddStudentModal from "@/components/AddStudentModal";

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
    lecturer: string;
  };

  const [attendance, setAttendance] = useState<Attendance>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
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
    setCurrentStudent(student);
    setIsEditModalOpen(true);
  };

  const saveEditedStudent = (editedStudent: Student) => {
    const updatedStudents = students.map((student) =>
      student.id === editedStudent.id ? editedStudent : student
    );
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setIsEditModalOpen(false);
  };

  const addNewStudent = (newStudent: Student) => {
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setIsModalOpen(false);
  };

  const deleteStudent = (studentId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedStudents = students.filter(
          (student) => student.id !== studentId
        );
        setStudents(updatedStudents);
        localStorage.setItem("students", JSON.stringify(updatedStudents));
        Swal.fire("Deleted!", "The student has been deleted.", "success");
      }
    });
  };

  const registered = (student: Student) => {
    Swal.fire({
      title: `${student.fullname} has already been registered `,
      width: 500,
      padding: "4px",
      color: "#716add",
      imageUrl: student.picture,
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: `${student.fullname}`,
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) => student.level === selectedLevel
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold ">
            Admin Dashboard
          </h1>
          <div className="flex justify-between mt-3 md:mt-0 w-full md:w-[55%] my-auto ">
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            className="border p-2 rounded my-auto"
          >
            <option value="">Select Level</option>
            {Array.from(new Set(students.map((student) => student.level))).map(
              (level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              )
            )}
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-blue-700 transition duration-200 my-auto"
          >
            Add Student
          </button>
          </div>
          
        </div>

        {selectedLevel && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 sm:px-4">Picture</th>
                  <th className="py-2 px-2 sm:px-4">Full Name</th>
                  <th className="py-2 px-2 sm:px-4">Level</th>
                  <th className="py-2 px-2 sm:px-4">Course</th>
                  <th className="py-2 px-2 sm:px-4">Department</th>
                  <th className="py-2 px-2 sm:px-4">Actions</th>
                  <th className="py-2 px-2 sm:px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b text-[12px] md:text-[14px]"
                  >
                    <td className="py-2 px-2 sm:px-4">
                      <Image
                        src={student.picture}
                        alt={student.fullname}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </td>
                    <td className="py-2 px-2 sm:px-4">{student.fullname}</td>
                    <td className="py-2 px-2 sm:px-4">{student.level}</td>
                    <td className="py-2 px-2 sm:px-4">{student.course}</td>
                    <td className="py-2 px-2 sm:px-4">{student.lecturer}</td>
                    <td className="py-3 px-2 sm:px-4 flex space-x-2 justify-center items-center mt-[8px]">
                      {attendance[student.id] ? (
                        <button
                          onClick={() => registered(student)}
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
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="bg-red-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="py-2 px-2 sm:px-4">
                      {attendance[student.id] ? "Present" : "Absent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddStudentModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSave={addNewStudent}
        />
      )}
      {isEditModalOpen && currentStudent && (
        <EditModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          student={currentStudent}
          onSave={saveEditedStudent}
        />
      )}
    </div>
  );
}

export default DashboardPage;
