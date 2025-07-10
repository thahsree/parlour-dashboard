/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSocket } from "@/lib/Socket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
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

  // ✅ Real-time listener (Socket.IO)
  useEffect(() => {
    const socket = getSocket();
    if (!date) return;

    if (!socket) return;

    const handleSocketUpdate = (newRecord: any) => {
      console.log("🔁 Attendance update via socket:", newRecord);

      queryClient.setQueryData(["attendance", date], (oldData: any[] = []) => {
        // Add new punch to the top, avoid duplicates
        const exists = oldData.some((a) => a._id === newRecord._id);
        if (exists) return oldData;

        return [newRecord, ...oldData];
      });
    };

    socket.on("attendance:update", handleSocketUpdate);

    return () => {
      socket.off("attendance:update", handleSocketUpdate);
    };
  }, [queryClient, date]);

  return {
    data,
    isLoading,
    isError,
    attendaceMutation,
  };
};
