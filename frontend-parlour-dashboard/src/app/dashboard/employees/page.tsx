"use client";

import AppTable from "@/components/AppTable";
import { useEmployee } from "@/hooks/useEmployee";

const Employees = () => {
  const { data } = useEmployee();
  console.log(data, "Employee");
  const taskColumns = [
    { label: "#ID", key: "_id" },
    { label: "Employee", key: "name" },
    { label: "Role", key: "role" },
    { label: "Contact Number", key: "contactNumber" },
  ];
  return (
    <div className="w-full h-full py-8 px-12 flex flex-col gap-4 items-center">
      <h2 className="text-5xl font-bold text-amber-700">EMPLOYEE DETAILS</h2>

      <div className="w-full mt-10">
        <button className="text-black border px-7 py-3 text-lg rounded hover:bg-black hover:text-amber-50 cursor-pointer">
          + Add Employee
        </button>
      </div>
      <AppTable taskColumns={taskColumns} data={data} />
    </div>
  );
};

export default Employees;
