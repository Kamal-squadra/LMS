import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CourseTable from "./Pages/CourseTable";
import CoursePreview from "./Pages/CoursePreview";
import VideoContentPage from "./Pages/ContentPages/VideoContentPage";
import DocumentContentPage from "./Pages/ContentPages/DocumentContentPage";  // Import Document Page
import QuizContentPage from "./Pages/ContentPages/QuizContentPage";  // Import Quiz Page
import PPTContentPage from "./Pages/ContentPages/PPTContentPage";  // Import Image Page
import Sidebar from "./Components/Sidebar"; 

// Helper component to conditionally render the sidebar
const ContentLayout = ({ children }) => {
  const location = useLocation();

  // List of routes where the sidebar should be visible
  const contentRoutes = ['/video', '/document', '/quiz', '/PPT'];

  // Check if current route matches any of the content routes
  const showSidebar = contentRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar activePath={location.pathname} />} {/* Render Sidebar if on content page */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-100">
        {children} {/* This will render the child content passed to this layout */}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      {/* Navbar is always rendered */}
      <Navbar />

      <Routes>
        {/* Non-content pages */}
        <Route path="/" element={<CourseTable />} />
        <Route path="/course-preview" element={<CoursePreview />} />

        {/* Content pages with sidebar */}
        <Route path="/video/:id" element={<ContentLayout><VideoContentPage /></ContentLayout>} />
        <Route path="/document/:id" element={<ContentLayout><DocumentContentPage /></ContentLayout>} />
        <Route path="/quiz/:id" element={<ContentLayout><QuizContentPage /></ContentLayout>} />
        <Route path="/PPT/:id" element={<ContentLayout><PPTContentPage /></ContentLayout>} />
      </Routes>
    </Router>
  );
}
