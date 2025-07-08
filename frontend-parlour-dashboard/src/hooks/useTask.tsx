import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4444/api";

const fetchTask = async () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.get(`${PORT}/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createTask = async (formData: {
  employeeId: string;
  task: string;
  date: string;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.post(
    `${PORT}/task/create-task`,
    { formData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

const updateTask = async ({
  taskData,
  id,
}: {
  taskData: { task?: string; status?: string; dueDate?: string };
  id: string;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  console.log(token);
  console.log(taskData, "ID>>>" + id);
  const res = await axios.patch(`${PORT}/task/update-task/${id}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    alert("task updated successfully");
  }

  return res.data;
};
export const useTask = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Task"],
    queryFn: fetchTask,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
    },
  });
  return {
    data,
    isLoading,
    isError,
    createTaskMutation,
    updateTaskMutation,
  };
};
