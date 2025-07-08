"use client";

import { useAttendace } from "@/hooks/useAttendance";
import { useEmployee } from "@/hooks/useEmployee";
import { useState } from "react";

const Attendace = () => {
  const { data } = useEmployee();
  const [attendanceStatus, setAttendanceStatus] = useState({
    id: "",
    status: "",
  });

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const { attendaceMutation } = useAttendace(formattedDate);
  const handleAttendance = (id: string, status: "in" | "out") => {
    if (!id || !status) {
      return alert("error while adding attendance");
    }
    attendaceMutation.mutate({ id, status });
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center py-10 px-5">
      <h2 className="text-4xl font-bold text-amber-700">Employee Attendance</h2>

      <ul className="w-full max-w-3xl flex flex-col gap-6">
        {data?.map((item: any) => (
          <li
            key={item._id}
            className="flex justify-between items-center p-4 bg-white shadow rounded text-black"
          >
            <div className="text-xl font-medium">{item.name}</div>
            <div className="flex gap-3">
              <button
                onClick={() => handleAttendance(item._id, "in")}
                className={`px-4 py-2 rounded text-white ${
                  attendanceStatus.status === "in"
                    ? "bg-green-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Check In
              </button>
              <button
                onClick={() => handleAttendance(item._id, "out")}
                className={`px-4 py-2 rounded text-white ${
                  attendanceStatus.status === "out"
                    ? "bg-red-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Check Out
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendace;
