import { Sidebar } from "@/components";

const Dashboard = () => {
  return (
    <div className="flex w-full h-[100vh]">
      <aside className="flex-1 h-full bg-red-400">
        <Sidebar />
      </aside>
      <main className="flex-3 h-full bg-yellow-900">content here</main>
    </div>
  );
};

export default Dashboard;
