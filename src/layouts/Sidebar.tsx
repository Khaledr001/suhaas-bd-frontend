import { NavLink } from "react-router-dom";
import { Home, Users, FolderKanban, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { cn } from "../utils/cn";

export default function Sidebar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: Home, roles: ["ADMIN", "USER"] },
    { label: "Users", path: "/users", icon: Users, roles: ["ADMIN"] },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
      roles: ["ADMIN", "USER"],
    },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Suhaas BD
        </h1>
        <p className="text-xs text-gray-400 mt-1">Project Management</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          if (!user || (item.roles && !item.roles.includes(user.role)))
            return null;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                )
              }>
              <item.icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-sm text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
