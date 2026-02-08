import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Album } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [ProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      if (ProfileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ProfileDropdownOpen]);
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Link className="flex items-center space-x-3" to="/dashboard">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-violet-500 rounded-lg flex items-center justify-center">
                <Album className="w-5 h-5 text-white" />
              </div>
              <span className="text-black font-bold text-xl">
                AI eBook Creator
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <ProfileDropdown
              isOpen={ProfileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!ProfileDropdownOpen);
              }}
              avatar={user?.avatar}
              companyName={user?.name}
              email={user?.email}
              onLogout={logout}
            />
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
