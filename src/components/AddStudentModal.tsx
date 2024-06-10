// components/AddStudentModal.tsx

'use client'

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Student, Lecturer } from "@/types";
import jsBarcode from 'jsbarcode';
import { v4 as uuidv4 } from 'uuid';

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
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    if (isOpen) {
      // const barcodeValue = uuidv4();  // Generate a unique barcode value
      const barcodeValue = uuidv4().substring(0, 8);
      const barcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${barcodeValue}`;
      setBarcode(barcodeUrl);
    }
  }, [isOpen]);

  const handleSave = () => {
    const newStudent: Student = { id: Date.now(), fullname, level, course, picture, barcode };
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
        <div className="border p-2 w-full mb-4">
          <label>Barcode:</label>
          <img src={barcode} alt="Barcode" />
        </div>
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
