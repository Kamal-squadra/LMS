import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icons/logo.svg"
import dummyAvatar from "../icons/DummyAvatar.png"
import notify from "../icons/Notify.svg"
import closeIcon from "../icons/closeIcon.svg"
const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [openNotify, setNotify] = useState(false);
  const [showRedDot, setShowRedDot] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleNotification = () => {
    setNotify(!openNotify);
    if (!openNotify) {
      setShowRedDot(false); // Hide red dot only if the popup is being opened
    }
  };

  const handleAvatarClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleCloseAvatar = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    // Logic for logging out user
    console.log("Logging out...");
    navigate("/login");
  };

  const handleNavigate = () => {
    navigate("/profile");
    setIsProfileOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target) &&
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsProfileOpen(false);
      setNotify(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="bg-white py-[16.5px] h-[73px] px-[20px] flex items-center justify-between border-b border-gray-200 w-full fixed"
      style={{ zIndex: 10 }}
    >
      <div className="p-[0] cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} className="h-[21.62px]" alt="App Icon" />
      </div>

      
    </nav>
  );
};

export default Navbar;
