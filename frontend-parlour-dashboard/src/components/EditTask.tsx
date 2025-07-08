import { Dispatch, SetStateAction } from "react";

interface EditTaskData {
  name?: string;
  task: string;
  dueDate: string;
  status: string;
  id: string;
}

interface Props {
  taskData: EditTaskData;
  setTaskData: Dispatch<SetStateAction<EditTaskData>>;
  handleSubmitEditedTask: () => void;
}

const EditTask = ({ taskData, setTaskData, handleSubmitEditedTask }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
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
        value={taskData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded"
        readOnly
      />
      <input
        type="text"
        name="task"
        value={taskData.task}
        onChange={handleChange}
        placeholder="task"
        className="border p-2 rounded"
      />
      <input
        type="string"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        placeholder="year-month-day format"
        className="border p-2 rounded"
      />
      <input
        type="string"
        name="status"
        value={taskData.status}
        onChange={handleChange}
        placeholder="status"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmitEditedTask}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default EditTask;
