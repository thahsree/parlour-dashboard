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
    <div className="w-full h-full py-8 px-12 flex flex-col gap-15 items-center">
      <h2 className="text-5xl font-bold text-amber-700">EMPLOYEE TASKS</h2>
      <AppTable data={data} taskColumns={taskColumns} />
    </div>
  );
};

export default Tasks;
