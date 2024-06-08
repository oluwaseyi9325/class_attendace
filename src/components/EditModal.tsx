
// components/EditModal.tsx

'use client'


import React, { useState } from "react";
import Modal from "react-modal";
import { Student } from "@/types";

type EditModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (editedStudent: Student) => void;
  student: Student;
};

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  student,
}) => {
  const [fullname, setFullname] = useState(student.fullname);
  const [level, setLevel] = useState(student.level);
  const [course, setCourse] = useState(student.course);
  const [picture, setPicture] = useState(student.picture);

  const handleSave = () => {
    const editedStudent: Student = {
      ...student,
      fullname,
      level,
      course,
      picture,
    };
    onSave(editedStudent);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
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

export default EditModal;
