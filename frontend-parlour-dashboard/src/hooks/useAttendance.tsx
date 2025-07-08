/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4444/api";

const fetchAttendance = async (date: string) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  console.log(date, "token");
  const res = await axios.get(`${PORT}/attendance`, {
    params: { date }, // query param: ?date=...
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const useAttendace = (date: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance", date],
    queryFn: () => fetchAttendance(date),
    enabled: !!date,
  });

  const attendaceMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await axios.post(`${PORT}/attendance/add-attendance`, {
        id,
        status,
      });

      if (res.data) {
        alert("attendance marked");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", date] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      alert(message); // Optional: show to user
    },
  });

  return {
    data,
    isLoading,
    isError,
    attendaceMutation,
  };
};
