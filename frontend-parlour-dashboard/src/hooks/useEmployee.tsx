import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4444/api";

const fetchEmployee = async () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.get(`${PORT}/employee`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createEmployee = async (formData: {
  name: string;
  role: string;
  contactNumber: number;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.post(
    `${PORT}/employee/create-employee`,
    { formData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

const updateEmployee = async ({
  formData,
  id,
}: {
  formData: { name?: string; role?: string; contactNumber?: number };
  id: string;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.patch(
    `${PORT}/employee/update-employee/${id}`,
    { formData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const useEmployee = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Employee"],
    queryFn: fetchEmployee,
  });

  const createTaskMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Employee"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Employee"] });
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
