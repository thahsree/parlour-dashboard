"use client";
import {
  CalendarCheck,
  ClipboardList,
  Home,
  LogOut,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Employees",
    url: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: ClipboardList,
  },
  {
    title: "Attendance",
    url: "/dashboard/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export default function AppSidebar() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex gap-15 py-5">
          <SidebarGroupLabel className="text-2xl">
            Parlour Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="px-4 py-2">
                  <SidebarMenuButton asChild>
                    {item.title === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-5 py-2 w-full text-left"
                      >
                        <item.icon />
                        <span className="text-2xl">{item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-5 py-2"
                      >
                        <item.icon />
                        <span className="text-2xl">{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
