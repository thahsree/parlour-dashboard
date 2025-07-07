/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4444/api";
const token = JSON.parse(localStorage.getItem("token") || "{}");
const fetchAttendance = async (date: string) => {
  console.log(token, "token");
  const res = await axios.post(
    `${PORT}/attendance`,
    { params: date },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
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
      const res = await axios.post(`${PORT}/attendace/add-attendance`, {
        id,
        status,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", date] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    attendaceMutation,
  };
};
