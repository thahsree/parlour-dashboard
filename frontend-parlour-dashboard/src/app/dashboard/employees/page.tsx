"use client";

import AddDataModel from "@/components/AddDataModel";
import AppTable from "@/components/AppTable";
import { useEmployee } from "@/hooks/useEmployee";
import { useState } from "react";

import { XSquare } from "lucide-react";

const Employees = () => {
  const { data } = useEmployee();
  const [showModel, setShowModel] = useState<boolean>(false);
  const { createEmployeeMutation } = useEmployee();
  type EmployeeFormData = {
    name: string;
    role: string;
    contactNumber: string;
  };

  const employeeFormFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "contactNumber", label: "Contact Number", type: "number" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contactNumber: "",
  });
  const taskColumns = [
    { label: "#ID", key: "_id" },
    { label: "Employee", key: "name" },
    { label: "Role", key: "role" },
    { label: "Contact Number", key: "contactNumber" },
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.role || !formData.contactNumber) {
      alert("incomplete required field");
      return;
    }
    createEmployeeMutation.mutate({
      name: formData.name,
      role: formData.role,
      contactNumber: Number(formData.contactNumber),
    });

    setFormData({
      name: "",
      role: "",
      contactNumber: "",
    });
    setShowModel(false);
  };

  return (
    <div className="w-full h-full py-8 px-12 flex flex-col gap-4 items-center relative">
      {showModel && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gray-300 border rounded text-black z-50">
          <div
            className="p-4 cursor-pointer"
            onClick={() => setShowModel((prev) => !prev)}
          >
            <XSquare width={30} height={30} />
          </div>
          <AddDataModel<EmployeeFormData>
            formData={formData}
            setFormData={setFormData}
            fields={employeeFormFields}
            onSubmit={handleSubmit}
            title="Add Employee"
          />
        </div>
      )}
      <h2 className="text-5xl font-bold text-amber-700">EMPLOYEE DETAILS</h2>
      <div className="w-full mt-10">
        <button
          onClick={() => setShowModel((prev) => !prev)}
          className="text-black border px-7 py-3 text-lg rounded hover:bg-black hover:text-amber-50 cursor-pointer"
        >
          + Add Employee
        </button>
      </div>
      <AppTable taskColumns={taskColumns} data={data} />
    </div>
  );
};

export default Employees;
