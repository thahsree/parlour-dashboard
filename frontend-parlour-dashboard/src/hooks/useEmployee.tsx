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
  contactNumber: string;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.post(`${PORT}/employee/create-employee`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res) {
    alert("employee created");
  }
  return res.data;
};

const updateEmployee = async ({
  formData,
  id,
}: {
  formData: { name?: string; role?: string; contactNumber?: string };
  id: string;
}) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.patch(
    `${PORT}/employee/update-employee/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.data) {
    console.log(res.data);
    alert("employee updated");
  }
  return res.data;
};

const deleteEmployee = async (id: string) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const res = await axios.delete(`${PORT}/employee/delete-employee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res) {
    alert("deleted employee from database");
  }
};
export const useEmployee = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Employee"],
    queryFn: fetchEmployee,
  });

  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Employee"] });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Employee"] });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Employee"] });
    },
  });
  return {
    data,
    isLoading,
    isError,
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
  };
};
