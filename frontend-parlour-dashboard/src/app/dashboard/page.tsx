"use client";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <p className="text-5xl">
        Welcome <span className="text-amber-500">{user.username}</span>
      </p>
      <p className="text-xl">
        Role : {user.role === 5555 ? "Super Admin" : "Admin"}
      </p>
    </div>
  );
};

export default Dashboard;
