// components/AddStudentModal.tsx
import React, { useState } from "react";
import Modal from "react-modal";
import { students } from "@/utils/data";
import avatar from "@/assets/avatar.png";

type Student = {
  id: number;
  picture: string;
  fullname: string;
  level: string;
  course: string;
  lecturer: string;
};

type AddStudentModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (newStudent: Student) => void;
};

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
}) => {
  const [newStudentData, setNewStudentData] = useState<Student>({
    id: Date.now(),
    fullname: "",
    level: "",
    course: "",
    lecturer: "",
    picture: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Ensure the static image URL is always used
    const studentToSave = {
      ...newStudentData,
      picture:
        "https://i.pinimg.com/736x/39/f2/40/39f240a04441d36e63432f10f21ff951.jpg",
    };
    onSave(studentToSave);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Student"
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Add New Student</h2>
      <div>
        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            name="fullname"
            value={newStudentData.fullname}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </label>
        <label className="block mb-2">
          Level:
          <input
            type="text"
            name="level"
            value={newStudentData.level}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </label>
        <label className="block mb-2">
          Course:
          <input
            type="text"
            name="course"
            value={newStudentData.course}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </label>
        <label className="block mb-2">
        Lecturer:
          <input
            type="text"
            name="lecturer"
            value={newStudentData.lecturer}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </label>
        <label className="block mb-4">
          Picture URL:
          <input
            type="text"
            name="picture"
            value={newStudentData.picture}
            onChange={handleInputChange}
            className="border rounded py-2 px-3 w-full"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddStudentModal;
