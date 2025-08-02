import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
} from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { Link } from "react-router-dom";
import img from "../images/user.png";
import DropdownProfile from "./Logout";

export function Header({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "home", icon: Home, label: "Home", link: "/home" },
    { id: "network", icon: Users, label: "My Network", link: "#" },
    { id: "jobs", icon: Briefcase, label: "Jobs", link: "#" },
    { id: "messaging", icon: MessageSquare, label: "Messaging", link: "#" },
    { id: "notifications", icon: Bell, label: "Notifications", link: "#" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">in</span>
              </div>
              <Link
                to="/home"
                className="font-semibold text-xl text-gray-900 hidden sm:block"
              >
                LinkedIn
              </Link>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 w-64 bg-gray-100 border-0 focus:bg-white"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            {navItems?.map((item) => (
              <Link
                key={item?.id}
                to={item?.link}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center p-2 h-auto ${
                  activeTab === item?.id ? "text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab(item?.id)}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1 hidden sm:block">
                  {item?.label}
                </span>
              </Link>
            ))}
            <DropdownProfile />
          </nav>
        </div>
      </div>
    </header>
  );
}
