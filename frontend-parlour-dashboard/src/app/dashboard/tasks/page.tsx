/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AddDataModel from "@/components/AddDataModel";
import AppTable from "@/components/AppTable";
import EditTask from "@/components/EditTask";
import { useTask } from "@/hooks/useTask";
import { XSquare } from "lucide-react";
import { useState } from "react";

const Tasks = () => {
  const { data, updateTaskMutation } = useTask();

  type TaskFormData = {
    employeeId: string;
    task: string;
    dueDate: string;
  };

  const employeeFormFields = [
    { name: "employeeId", label: "employee", type: "text" },
    { name: "task", label: "Task", type: "text" },
    { name: "dueDate", label: "due Date", type: "text" },
  ];

  const [showModel, setShowModel] = useState<boolean>(false);
  const [editModel, setEditModel] = useState<boolean>(false);
  const [taskData, setTaskData] = useState({
    task: "",
    dueDate: "",
    status: "",
    id: "",
  });

  const [formData, setFormData] = useState({
    employeeId: "",
    task: "",
    dueDate: "",
  });

  const { createTaskMutation } = useTask();

  const taskColumns = [
    { label: "Employee", key: "employeeId.name" },
    { label: "Role", key: "employeeId.role" },
    { label: "Task", key: "task" },
    { label: "Due Date", key: "dueDate" },
    { label: "Status", key: "status" },
  ];

  const handleSubmit = async () => {
    alert("sbmit createtask");
    createTaskMutation.mutate(formData);
    setFormData({
      employeeId: "",
      task: "",
      dueDate: "",
    });

    setShowModel(false);
  };

  const handleEditTask = (data: any) => {
    setEditModel(true);
    console.log(data, "need to edit");
    const details = {
      name: data.employeeId.name,
      id: data._id,
      task: data.task,
      status: data.status,
      dueDate: data.dueDate,
    };
    setTaskData(details);
  };

  const handleSubmitEditedTask = () => {
    console.log(taskData, "new Task Data");
    if (!taskData.dueDate || !taskData.status || !taskData.task) {
      alert("incolmplete required fields");
      return;
    }
    const newData = {
      task: taskData.task,
      dueDate: taskData.dueDate,
      status: taskData.status,
    };
    updateTaskMutation.mutate({ taskData: newData, id: taskData.id });
    setEditModel(false);
    setTaskData({
      task: "",
      dueDate: "",
      status: "",
      id: "",
    });
  };
  const handleDeleteTask = (data: any) => {};

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
          <AddDataModel<TaskFormData>
            formData={formData}
            setFormData={setFormData}
            fields={employeeFormFields}
            onSubmit={handleSubmit}
            title="Add Task"
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
          <EditTask
            taskData={taskData}
            setTaskData={setTaskData}
            handleSubmitEditedTask={handleSubmitEditedTask}
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
      <AppTable
        taskColumns={taskColumns}
        data={data}
        renderActions={(row) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleEditTask(row)} // this can be async internally
              className="text-blue-600 underline hover:text-blue-800 text-lg cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(row)} // this can be async internally
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

export default Tasks;
