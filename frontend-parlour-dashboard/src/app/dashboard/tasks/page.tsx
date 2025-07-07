"use client";
import AddDataModel from "@/components/AddDataModel";
import AppTable from "@/components/AppTable";
import { useTask } from "@/hooks/useTask";
import { useState } from "react";

const Tasks = () => {
  const { data } = useTask();

  const [showModel, setShowModel] = useState<boolean>(false);

  type TaskFormData = {
    employeeId: string;
    task: string;
    dueDate: string;
  };

  const employeeFormFields = [
    { name: "employeeId", label: "employee", type: "text" },
    { name: "Task", label: "task", type: "text" },
    { name: "dueDate", label: "due Date", type: "text" },
  ];

  const [formData, setFormData] = useState({
    employeeId: "",
    task: "",
    dueDate: "",
  });

  const taskColumns = [
    { label: "Employee", key: "employeeId.name" },
    { label: "Role", key: "employeeId.role" },
    { label: "Task", key: "task" },
    { label: "Due Date", key: "dueDate" },
    { label: "Status", key: "status" },
  ];

  const handleSubmit = async () => {};
  return (
    <div className="w-full h-full py-8 px-12 flex flex-col gap-4 items-center relative">
      {showModel && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gray-300 border rounded text-black z-50">
          <AddDataModel<TaskFormData>
            formData={formData}
            setFormData={setFormData}
            fields={employeeFormFields}
            onSubmit={handleSubmit}
            title="Add Task"
          />
        </div>
      )}
      <h2 className="text-5xl font-bold text-amber-700">EMPLOYEE TASKS</h2>

      <div className="w-full mt-10">
        <button
          onClick={() => setShowModel((prev) => !prev)}
          className="text-black border px-7 py-3 text-lg rounded hover:bg-black hover:text-amber-50 cursor-pointer"
        >
          + Assign Task
        </button>
      </div>
      <AppTable taskColumns={taskColumns} data={data} />
    </div>
  );
};

export default Tasks;
