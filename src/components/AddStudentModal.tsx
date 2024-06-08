
// "use client";

// import React, { useState } from "react";

// type Lecturer = {
//   id: number;
//   fullname: string;
//   courses: { course: string; level: string }[];
// };

// type AddStudentModalProps = {
//   onSave: (student: Student) => void;
//   onRequestClose: () => void;
//   isOpen: boolean;
//   lecturers: Lecturer[];
// };

// type Student = {
//   id: number;
//   fullname: string;
//   level: string;
//   course: string;
//   lecturer: string;
//   picture: string;
// };

// const AddStudentModal: React.FC<AddStudentModalProps> = ({
//   onRequestClose,
//   onSave,
//   lecturers,
// }) => {
//   const [fullname, setFullname] = useState("");
//   const [level, setLevel] = useState("");
//   const [course, setCourse] = useState("");
//   const [picture, setPicture] = useState("");

//   const handleSave = () => {
//     const lecturer = lecturers.find((lect) =>
//       lect.courses.some((c) => c.course === course && c.level === level)
//     )?.fullname;

//     const newStudent: Student = {
//       id: Date.now(),
//       fullname,
//       level,
//       course,
//       lecturer: lecturer || "Unknown",
//       picture: 'https://i.pinimg.com/736x/39/f2/40/39f240a04441d36e63432f10f21ff951.jpg',
//     };
//     onSave(newStudent);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4">Add Student</h2>
//         <div className="mb-4">
//           <label className="block mb-2">Full Name</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Level</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Course</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={course}
//             onChange={(e) => setCourse(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Picture URL</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={picture}
//             onChange={(e) => setPicture(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={onRequestClose}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200 mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddStudentModal;







// components/AddStudentModal.tsx

'use client'

// components/AddStudentModal.tsx

import React, { useState } from "react";
import Modal from "react-modal";
import { Student, Lecturer } from "@/types";

type AddStudentModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (newStudent: Student) => void;
  lecturers: Lecturer[];
};

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  lecturers,
}) => {
  const [fullname, setFullname] = useState("");
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [picture, setPicture] = useState("");

  const handleSave = () => {
    const newStudent: Student = { id: Date.now(), fullname, level, course, picture };
    onSave(newStudent);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Picture URL"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onRequestClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddStudentModal;
