import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CourseTable from "./Pages/CourseTable";
import CoursePreview from "./Pages/CoursePreview";
import VideoContentPage from "./Pages/ContentPages/VideoContentPage";
import DocumentContentPage from "./Pages/ContentPages/DocumentContentPage";
import QuizContentPage from "./Pages/ContentPages/QuizContentPage";
import PPTContentPage from "./Pages/ContentPages/PPTContentPage";
import Sidebar from "./Components/Sidebar";

import cross from "./icons/close.svg";  
import hamburger from "./icons/menu-burger.svg";


const ContentLayout = ({ children }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 640) {
      setIsExpanded(false); // Collapse sidebar for small screens (e.g., mobile)
    } else {
      setIsExpanded(true);  // Expand sidebar for larger screens
    }
  }, [screenWidth]);

  const contentRoutes = ['/video', '/document', '/quiz', '/PPT'];
  const showSidebar = contentRoutes.some(route => location.pathname.startsWith(route));

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev); // Toggle expanded/collapsed sidebar
  };


  return (
    <div className="flex h-full">
      {showSidebar && <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} activePath={location.pathname} />}
      <div className={`flex-1 h-full w-full overflow-y-auto ${isExpanded ? "hidden" : ""} sm:contents bg-gray-50 mt-[80px]`}>
        {children}
      </div>
      <button
          onClick={toggleSidebar}
          className={`bg-blue-900 absolute z-10 top-[150px] transition-all duration-600 ${isExpanded ? "left-[350px]": "left-[32px]"} text-white w-[24px] h-[24px] ${isExpanded? "p-1 ":"p-1 mb-6"} rounded-full  border-2 border-blue-900 shadow-lg flex items-center justify-center  transition duration-300`}
        >
          <img
            src={isExpanded ? cross : hamburger}
            className="w-[24px] h-[24px]"
            alt="Toggle Sidebar"
          />
        </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CourseTable />} />
        <Route path="/course-preview" element={<CoursePreview />} />
        <Route path="/video/:id" element={<ContentLayout><VideoContentPage /></ContentLayout>} />
        <Route path="/document/:id" element={<ContentLayout><DocumentContentPage /></ContentLayout>} />
        <Route path="/quiz/:id" element={<ContentLayout><QuizContentPage /></ContentLayout>} />
        <Route path="/PPT/:id" element={<ContentLayout><PPTContentPage /></ContentLayout>} />
      </Routes>
    </Router>
  );
}
