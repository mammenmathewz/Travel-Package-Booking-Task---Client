import { SidebarProvider } from "../../components/ui/sidebar";
import { Home, Users, LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

const items = [
  {
    title: "Packages",
    url: "/admin/packages",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-64">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-4 overflow-auto bg-gray-50 dark:bg-gray-900">
          <Outlet /> {/* Content for nested routes */}
        </div>
      </div>
    </SidebarProvider>
  );
}
