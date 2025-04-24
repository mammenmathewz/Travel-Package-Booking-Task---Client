import { SidebarProvider } from "../../components/ui/sidebar";
import { Home, Users, LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/Context/AuthContext";  // Import your custom context

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
  const navigate = useNavigate();
  const { setUser } = useAuth();  // Access the setUser method from context

  const handleLogout = () => {
    // Clear local storage (or your preferred method of clearing auth data)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("userName");

    // Clear context state (reset the user)
    setUser({ token: null, role: null, id: null });

    // Redirect to the home page
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="min-w-64 max-w-64 w-64">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        {item.title === "Logout" ? (
                          // Handle Logout button separately
                          <button onClick={handleLogout}>
                            <item.icon />
                            <span>{item.title}</span>
                          </button>
                        ) : (
                          <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-4 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
