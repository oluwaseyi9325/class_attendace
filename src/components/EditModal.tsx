import React from "react";
import Modal from "react-modal";

type Student = {
  id: number;
  picture: string;
  fullname: string;
  level: string;
  course: string;
  lecturer: string;
};

type EditModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  student: Student | null;
  onSave: (student: Student) => void;
};

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  student,
  onSave,
}) => {
  const [editStudentData, setEditStudentData] = React.useState<Student | null>(
    student
  );

  React.useEffect(() => {
    setEditStudentData(student);
  }, [student]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editStudentData) {
      setEditStudentData({
        ...editStudentData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editStudentData) {
      onSave(editStudentData);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
            Lecturer:
            <input
              type="text"
              name="lecturer"
              value={editStudentData.lecturer}
              onChange={handleEditChange}
              className="border rounded py-2 px-3 w-full"
            />
          </label>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onRequestClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
