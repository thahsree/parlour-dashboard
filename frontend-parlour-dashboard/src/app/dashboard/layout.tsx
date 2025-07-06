import { AppSidebar } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProtectedRouteProvider from "@/Providers/ProtectedRouteProvider";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRouteProvider>
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
    </ProtectedRouteProvider>
  );
}
