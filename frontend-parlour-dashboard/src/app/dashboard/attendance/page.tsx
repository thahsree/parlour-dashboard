"use client";
import AppTable from "@/components/AppTable";
import { useAttendace } from "@/hooks/useAttendance";

export default function Attendance() {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const { data } = useAttendace(formattedDate);

  console.log(data, "New Data");
  const taskColumns = [
    { label: "Employee", key: "employeeId.name" },
    { label: "Status", key: "status" },
    { label: "Role", key: "employeeId.role" },
    { label: "Time", key: "timeStamp" },
  ];

  console.log(data, "Attendace");
  return (
    <div className="w-full h-full py-8 px-12 flex flex-col gap-4 items-center">
      <h2 className="text-5xl font-bold text-amber-700">EMPLOYEE ATTENDANCE</h2>

      <AppTable taskColumns={taskColumns} data={data} />
    </div>
  );
}
