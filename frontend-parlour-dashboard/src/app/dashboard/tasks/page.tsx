"use client";
import AppTable from "@/components/AppTable";
import { useTask } from "@/hooks/useTask";

const Tasks = () => {
  const { data } = useTask();

  const taskColumns = [
    { label: "Employee", key: "employeeId.name" },
    { label: "Role", key: "employeeId.role" },
    { label: "Task", key: "task" },
    { label: "Due Date", key: "dueDate" },
    { label: "Status", key: "status" },
  ];
  return (
    <div className="w-full h-full py-8 px-12 flex flex-col gap-4 items-center">
      <h2 className="text-5xl font-bold text-amber-700">EMPLOYEE TASKS</h2>

      <div className="w-full mt-10">
        <button className="text-black border px-7 py-3 text-lg rounded hover:bg-black hover:text-amber-50 cursor-pointer">
          + Assign Task
        </button>
      </div>
      <AppTable taskColumns={taskColumns} data={data} />
    </div>
  );
};

export default Tasks;
