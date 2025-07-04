import { AppSidebar } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="hidden max-sm:flex">
          {" "}
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
