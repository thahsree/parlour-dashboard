import { Dispatch, SetStateAction } from "react";

interface EmployeeFormData {
  name: string;
  role: string;
  contactNumber: number;
}

interface Props {
  employeeData: EmployeeFormData;
  setEmployeeData: Dispatch<SetStateAction<EmployeeFormData>>;
  handleSubmitEditedEmployee: () => void;
}

const EditForm = ({
  employeeData,
  setEmployeeData,
  handleSubmitEditedEmployee,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <input
        type="text"
        name="name"
        value={employeeData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="role"
        value={employeeData.role}
        onChange={handleChange}
        placeholder="Role"
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="contactNumber"
        value={employeeData.contactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmitEditedEmployee}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default EditForm;
