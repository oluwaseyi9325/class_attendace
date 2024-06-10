'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Student, Lecturer } from "@/types";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import Image from "next/image";

type Attendance = {
  studentId: number;
  date: string;
  status: "Present" | "Absent";
};

const LecturerDashboardPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isLecturer = localStorage.getItem("isLecturer");
    if (!isLecturer) {
      router.push("/lecturer/signin");
    } else {
      const storedLecturer = JSON.parse(localStorage.getItem("lecturer") || "null");
      setLecturer(storedLecturer);
    }

    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);

    const storedAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
    setAttendance(storedAttendance);
  }, [router]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  useEffect(() => {
    if (selectedCourse) {
      const results = students.filter((student) =>
        student.course.toLowerCase().includes(selectedCourse.toLowerCase())
      );
      setFilteredStudents(results);
    }
  }, [selectedCourse, students]);

  const markAttendance = (studentId: number, status: "Present" | "Absent") => {
    const today = new Date().toLocaleDateString();

    const existingRecord = attendance.find(
      (record) =>
        record.studentId === studentId &&
        new Date(record.date).toLocaleDateString() === today
    );

    if (existingRecord) {
      Swal.fire("Error", "Attendance for today already marked", "error");
      return;
    }

    const newAttendance = {
      studentId,
      date: new Date().toISOString(),
      status,
    };

    const updatedAttendance = [...attendance, newAttendance];
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));

    Swal.fire("Success", `Marked as ${status}`, "success");
  };

  const getStudentAttendance = (studentId: number) => {
    return attendance
      .filter((record) => record.studentId === studentId)
      .map((record) => `${new Date(record.date).toLocaleString()}: ${record.status}`)
      .join("\n");
  };

  const csvData = filteredStudents.map((student) => ({
    fullname: student.fullname,
    level: student.level,
    course: student.course,
    attendance: getStudentAttendance(student.id),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Lecturer Dashboard</h1>
        {lecturer && (
          <div className="mb-4">
            <h2 className="text-lg font-bold">Select Course</h2>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="border p-2 rounded mb-4 w-full md:w-[600px]"
            >
              <option value="">Select Course</option>
              {lecturer.courses.map((course, index) => (
                <option key={index} value={course.course}>
                  {course.course}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedCourse && (
          <div>
            <h2 className="text-lg font-bold mb-4">Students Enrolled in {selectedCourse}</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                <th className="border border-gray-200 p-2">S/N</th>
                  <th className="border border-gray-200 p-2">Full Name</th>
                  <th className="border border-gray-200 p-2">Level</th>
                  <th className="border border-gray-200 p-2">Course</th>
                  <th className="border border-gray-200 p-2">Attendance</th>
                  <th className="border border-gray-200 p-2">BAR-CODE</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student,i) => (
                  <tr key={student.id}>
                     <td className="border border-gray-200 p-2">{i+1}</td>
                    <td className="border border-gray-200 p-2">{student.fullname}</td>
                    <td className="border border-gray-200 p-2">{student.level}</td>
                    <td className="border border-gray-200 p-2">{student.course}</td>
                    <td className="border border-gray-200 p-2">
                      <button
                        onClick={() => markAttendance(student.id, "Present")}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-700 transition duration-200"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(student.id, "Absent")}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                      >
                        Absent
                      </button>
                      <div className="mt-2">
                        {getStudentAttendance(student.id).split("\n").map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-200 p-2 flex justify-center">
                    <img style={{width:100}} src={student.barcode} alt="Barcode" />
                      </td>
                  </tr>

                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <CSVLink
                data={csvData}
                headers={[
                  { label: "Full Name", key: "fullname" },
                  { label: "Level", key: "level" },
                  { label: "Course", key: "course" },
                  { label: "Attendance", key: "attendance" },
                ]}
                filename={`students_in_${selectedCourse}.csv`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Export to Excel
              </CSVLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerDashboardPage;
