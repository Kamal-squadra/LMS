import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cours } from "../DummyData/CoursesDummyData";
import vid from "../icons/video-icon.svg";
import doc from "../icons/doc-icon.svg";
import quiz from "../icons/assignment-icon.svg";
import PPT from "../icons/PPT.svg";
import back from "../icons/back.svg";
import closeIcon from "../icons/close-icon.svg";
import cross from "../icons/close.svg";  
import hamburger from "../icons/menu-burger.svg";

const Sidebar = ({ setIsExpanded, isExpanded }) => {
  const [expandedContent, setExpandedContent] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const toggleContent = (index) => {
    setExpandedContent((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActive = (contentId, contentType) => {
    return location.pathname.includes(`${contentType}/${contentId}`);
  };

  useEffect(() => {
    const activeModuleIndex = cours.trainingModules.findIndex((module) =>
      module.trainingModuleContents.some((content) =>
        location.pathname.includes(content.id)
      )
    );

    if (activeModuleIndex !== -1) {
      setExpandedContent((prev) => ({
        ...prev,
        [activeModuleIndex]: true,
      }));
    }
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate("/course-preview");
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev); // Toggle expanded/collapsed sidebar
  };

  return (
    <div
      className={`transition-all duration-800 ${
        isExpanded ? "w-[360px]" : "w-[50px]"
      } mt-[60px] bg-white text-black shadow-2xl ${
        isExpanded ? "px-4" : "px-2" // Apply smaller padding when collapsed
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`flex w-full ${
          isExpanded ? "justify-end" : "justify-start"
        } ml-1 text-gray-600 w-[328px] font-semibold mt-4 mb-4 hover:text-gray-900`}
      >
        <img
          src={isExpanded ? cross : hamburger}
          className="w-[24px] h-[24px] mr-2"
          alt="Toggle Sidebar"
        />
      </button>
      <button
        onClick={handleGoBack}
        className="flex items-center mb-4 w-[328px] text-gray-600 font-semibold hover:text-gray-900"
      >
        <img
          src={back}
          className={`${isExpanded ? "" : "ml-3 w-[16px] h-[16px]"}`}
          alt="Back"
        />
        {isExpanded && "Course Overview"}
      </button>

      <p
        className={`text-[#737373] pb-4 font-semibold border-b mb-4 ${
          isExpanded ? "" : "text-white"
        }`}
      >
        {isExpanded ? "LESSONS" : "-"}
      </p>

      {cours.trainingModules.map((module, moduleIndex) => (
        <div key={moduleIndex} className="mb-6 overflow-hidden">
          <h3
            onClick={() => toggleContent(moduleIndex)}
            className={`text-[18px] w-[328px] font-semibold text-gray-800 cursor-pointer p-3 bg-gray-100 ${
              expandedContent[moduleIndex] ? "rounded-t-lg" : "rounded-lg"
            } hover:bg-gray-200 transition duration-300 flex items-center justify-between`}
          >
            <span>
              {isExpanded
                ? truncateText(module.title[0]?.value || "Untitled Module", 29)
                : `${moduleIndex + 1}.`}
            </span>
            <img
              src={closeIcon}
              alt="Toggle"
              className={`h-[20px] w-[20px] transform transition duration-800 ${
                expandedContent[moduleIndex] ? "rotate-180" : ""
              }`}
            />
          </h3>

          {expandedContent[moduleIndex] && (
            <div className="bg-gray-100 rounded-b-lg">
              <ul>
                {module.trainingModuleContents.map((content, contentIndex) => (
                  <li
                    key={contentIndex}
                    className={`flex items-center cursor-pointer w-[328px] ${
                      contentIndex === module?.trainingModuleContents?.length - 1
                        ? "rounded-b-lg"
                        : ""
                    } bg-gray-100 transition duration-200 ${
                      isActive(content.id, content.type) ? "bg-gray-200" : ""
                    }`}
                  >
                    <Link
                      to={`/${content.type}/${content.id}`}
                      className="flex p-2 items-center w-full"
                    >
                      <span className="flex-shrink-0 mr-2">
                        {getContentIcon(content.type, isExpanded)} {/* Pass `isExpanded` to get different icon sizes */}
                      </span>
                      {isExpanded && (
                        <div className="px-2">
                          <span className="text-sm text-gray-700">
                            {truncateText(content.title[0]?.value || "Untitled Content", 35)}
                          </span>
                          <p className="text-[12px] text-gray-900">
                            {content.duration} minutes
                          </p>
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const getContentIcon = (type, isExpanded) => {
  const iconSize = isExpanded ? "h-[32px] w-[32px]" : "h-[16px] w-[16px]"; // Conditionally set icon size

  switch (type) {
    case "video":
      return <img src={vid} alt="Video" className={iconSize} />;
    case "document":
      return <img src={doc} alt="Document" className={iconSize} />;
    case "quiz":
      return <img src={quiz} alt="Quiz" className={iconSize} />;
    case "PPT":
      return <img src={PPT} alt="PPT" className={iconSize} />;
    default:
      return null;
  }
};

export default Sidebar;
