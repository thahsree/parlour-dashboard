"use client";

import AddDataModel from "@/components/AddDataModel";
import AppTable from "@/components/AppTable";
import { useEmployee } from "@/hooks/useEmployee";
import { useState } from "react";

import EditForm from "@/components/EditForm";
import { XSquare } from "lucide-react";

const Employees = () => {
  const { data } = useEmployee();
  const [showModel, setShowModel] = useState<boolean>(false);
  const [editModel, setEditModel] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<any>({
    name: "",
    role: "",
    contactNumber: "",
    id: "",
  });
  const {
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
  } = useEmployee();
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
      contactNumber: formData.contactNumber,
    });

    setFormData({
      name: "",
      role: "",
      contactNumber: "",
    });
    setShowModel(false);
  };

  const handleEditEmployee = (data: any) => {
    setEditModel(true);
    const details = {
      name: data.name,
      role: data.role,
      contactNumber: data.contactNumber,
      id: data._id,
    };
    setEmployeeData(details);
  };
  const handleSubmitEditedEmployee = () => {
    if (
      !employeeData.name ||
      !employeeData.role ||
      !employeeData.contactNumber
    ) {
      alert("incomplete required field");
      return;
    }

    updateEmployeeMutation.mutate({
      id: employeeData.id,
      formData: {
        name: employeeData.name,
        role: employeeData.role,
        contactNumber: employeeData.contactNumber,
      },
    });

    setEmployeeData({
      name: "",
      role: "",
      contactNumber: "",
      id: "",
    });
    setEditModel(false);
  };

  const handleDeleteEmployee = (data: any) => {
    deleteEmployeeMutation.mutate(data._id);
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
      {editModel && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gray-300 border rounded text-black z-50">
          <div
            className="p-4 cursor-pointer"
            onClick={() => setEditModel((prev) => !prev)}
          >
            <XSquare width={30} height={30} />
          </div>
          <EditForm
            employeeData={employeeData}
            setEmployeeData={setEmployeeData}
            handleSubmitEditedEmployee={handleSubmitEditedEmployee}
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
      <AppTable
        taskColumns={taskColumns}
        data={data}
        renderActions={(row) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleEditEmployee(row)} // this can be async internally
              className="text-blue-600 underline hover:text-blue-800 text-lg cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteEmployee(row)} // this can be async internally
              className="text-blue-600 underline hover:text-blue-800 text-lg cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Employees;
