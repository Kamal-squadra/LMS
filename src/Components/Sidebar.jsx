import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cours } from "../DummyData/CoursesDummyData";
import vid from "../icons/video-icon.svg";
import doc from "../icons/doc-icon.svg";
import quiz from "../icons/assignment-icon.svg";
import PPT from "../icons/PPT.svg";
import back from "../icons/back.svg";
import closeIcon from "../icons/close-icon.svg";

const Sidebar = () => {
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

  return (
    <div className="w-[360px] mt-[70px] bg-white text-black p-4 shadow-2xl">
      <button
        onClick={handleGoBack}
        className="flex items-center mb-4 text-gray-600 font-semibold hover:text-gray-900"
      >
        <img src={back} alt="" />
        Course Overview
      </button>
       <p className="text-[#737373] pb-4 font-semibold border-b mb-4">
        LESSONS
       </p>
      {cours.trainingModules.map((module, moduleIndex) => (
        <div key={moduleIndex} className="mb-6">
          <h3
            onClick={() => toggleContent(moduleIndex)}
            className={`text-[18px] font-semibold text-gray-800 cursor-pointer p-3 bg-gray-100 ${
              expandedContent[moduleIndex] ? "rounded-t-lg" : "rounded-lg"
            } hover:bg-gray-200 transition duration-300 flex items-center justify-between`}
          >
            <span>
              {moduleIndex + 1}.{" "}
              {truncateText(module.title[0]?.value || "Untitled Module", 29)}
            </span>
            <img
              src={closeIcon}
              alt="Toggle"
              className={`h-[20px] w-[20px] transform transition duration-300 ${
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
                    className={`flex items-center  cursor-pointer ${
                      contentIndex ===
                      module?.trainingModuleContents?.length - 1
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
                      <span className="flex-shrink-0 mr-2 ">
                        {getContentIcon(content.type)}
                      </span>
                      <div className="px-2">
                        <span className="text-sm text-gray-700">
                          {truncateText(
                            content.title[0]?.value || "Untitled Content",
                            35
                          )}
                        </span>
                        <p className="text-[12px] text-gray-900">{content.duration} minutes</p>
                      </div>
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

const getContentIcon = (type) => {
  switch (type) {
    case "video":
      return <img src={vid} alt="Video" className="h-[32px] w-[32px]" />;
    case "document":
      return <img src={doc} alt="Document" className="h-[32px] w-[32px]" />;
    case "quiz":
      return <img src={quiz} alt="Quiz" className="h-[32px] w-[32px]" />;
    case "PPT":
      return <img src={PPT} alt="PPT" className="h-[32px] w-[32px]" />;
    default:
      return null;
  }
};

export default Sidebar;
