import { useState } from "react";
import { useNavigate } from "react-router-dom";
import videoIcon from "../icons/video-icon.svg";
import documentIcon from "../icons/doc-icon.svg";
import assessmentIcon from "../icons/test-quiz.svg";
import openIcon from "../icons/open-icon.svg";
import closeIcon from "../icons/close-icon.svg";
import clockIcon from "../icons/clock-icon.svg";
import bookIcon from "../icons/PPT.svg";
import starIcon from "../icons/star-icon.svg";
import { cours } from "../DummyData/CoursesDummyData";
import assessment from "../icons/assignment-icon.svg"
const CoursePreview = () => {
  const navigate = useNavigate();

  // Static data for the course
  const [course, setCourse] = useState(cours);
  const [expandedContent, setExpandedContent] = useState({});
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleContent = (index) => {
    setExpandedContent((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  const lastModifiedDate = new Date(course.updatedAt);

  // Function to get the correct icon based on content type
  const getContentIcon = (type) => {
    switch (type) {
      case "video":
        return videoIcon;
      case "document":
        return documentIcon;
      case "quiz":
        return assessmentIcon;
      case "PPT":
        return bookIcon;
      default:
        return null;
    }
  };

  const handleContentClick = (contentId, contentType) => {
    // Redirect user based on the content type
    switch (contentType) {
      case "video":
        navigate(`/video/${contentId}`);
        break;
      case "document":
        navigate(`/document/${contentId}`);
        break;
      case "quiz":
        navigate(`/quiz/${contentId}`);
        break;
      case "PPT":
        navigate(`/PPT/${contentId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{ height: "calc(100vh)", scrollbarWidth: "none" }}
      className="w-full pt-[80px] bg-white overflow-y-auto custom-scrollbar mx-auto"
    >
      {/* Header */}
      <div className="relative">
        <img
          src={
            course.thumbnail ||
            "https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?t=st=1730288301~exp=1730291901~hmac=ec4953bb3dc4933475c9eba8d528590b3ce3a43e4636e3b2eabd6ebe782a805f&w=1380"
          }
          alt={course.title[0].value}
          className="w-full h-[300px] object-cover shadow-md "
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-[5%] justify-center text-white p-4">
          <h2 className="text-[30px] font-bold sm:text-[36px] h-[86px]">
            {course.title[0].value}
          </h2>
          <div>
            <span  onClick={()=>handleContentClick("1fhOei_1T-Vo15tXQM5geVzomM4dl78DI", "video")} className="mt-2 inline-flex bg-white text-black font-semibold py-1 px-2 rounded">
              START COURSE
            </span>
          </div>
          <div className="flex space-x-4 mt-2 flex-wrap">
            <span className="text flex items-center">
              Author Name:{" "}
              <p className="font-thin pl-1"> {course.authorName}</p>
            </span>
            {/* <span className="text flex items-center">
              Last Modified:{" "}
              <p className="font-thin pl-1">
                {lastModifiedDate.toLocaleDateString()}
              </p>
            </span> */}
          </div>
        </div>
      </div>

      <div className="mt-4 px-[5%] py-[38px] sm:px-[3%]">
        <h1 className="text-2xl font-bold">Overview</h1>

        {/* Description with Read More */}
        <div className="relative">
          <p
            className={`text-gray-800 transition-all duration-500 ease-in-out ${
              isDescriptionExpanded
                ? "max-h-[1000px]"
                : "max-h-12 overflow-hidden"
            }`}
          >
            {course.description[0].value || "No overview provided."}
          </p>

          {/* Only show Read More/Read Less button if the description length exceeds 100 characters */}
          {course.description[0].value.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-blue-600 mt-4 block mx-auto"
            >
              {isDescriptionExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
        <h1 className="text-2xl font-bold">Course Content</h1>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-2/3">
            {course.trainingModules.map((module, index) => (
              <div key={index} className="rounded-lg my-4">
                <div
                  onClick={() => toggleContent(index)}
                  className={`flex flex-col gap-[16px] items-start justify-between ${
                    expandedContent[index] ? "rounded-t-lg" : "rounded-lg "
                  } p-4 cursor-pointer bg-[#FAFAFA]`}
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-bold text-[16px]">
                      {index + 1 + ". " + module.title[0]?.value ||
                        "Untitled Module"}
                    </h3>
                    <img
                      src={expandedContent[index] ? openIcon : closeIcon}
                      alt="Toggle Content"
                      className="h-5 w-5"
                    />
                  </div>
                </div>

                <div
                  className={`overflow-hidden  rounded-b-lg bg-gray-50 transition-all duration-500 ease-in-out ${
                    expandedContent[index] ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="px-4">
                    {module.trainingModuleContents.length > 0 ? (
                      <ul className="">
                        {module.trainingModuleContents.map((content, idx) => (
                          <li
                            key={idx}
                            className={`flex items-center ${
                              module.trainingModuleContents.length - 1 === idx
                                ? ""
                                : "border-b"
                            }  border-gray-200 space-x-3 cursor-pointer py-[12px]`}
                            onClick={() =>
                              handleContentClick(content.id, content.type)
                            }
                          >
                            <img
                              src={getContentIcon(content.type)}
                              alt="Content Type"
                              className="h-[32px] w-[32px]"
                            />
                            <div>
                              <p>
                                {content.title[0].value || "Untitled Content"}
                              </p>

                              <p className="text-[14px] font-natural-900">{content.duration + "minutes"}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No content available for this module.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-[200px] sm:mt-0 sm:w-1/3 md:ml-6 pt-4">
            <div className="border p-4 rounded-lg flex flex-col justify-between gap-2">
              <h2 className="text-lg font-bold mb-2">This course includes:</h2>
              <div className="flex items-center mb-2">
                <img src={clockIcon} alt="Duration" className="h-5 w-5 mr-2" />
                <span className="text-[#4A5E6D] font-semibold">
                  {course.durationHours} hours
                </span>
              </div>
              <div className="flex items-center mb-2">
                <img
                  src={bookIcon}
                  alt="Course Type"
                  className="h-5 w-5 mr-2"
                />
                <span className="text-[#4A5E6D] font-semibold">
                  {course.lessons + " Lessons" || "N/A"}
                </span>
              </div>
              <div className="flex items-center mb-2">
              <img
                  src={assessment}
                  alt="Course Type"
                  className="h-5 w-5 mr-2"
                />
                <span className="text-[#4A5E6D] font-semibold">
                  {course.assessment + " Assessments" || "N/A"}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <img
                  src={starIcon}
                  alt="Approval Status"
                  className="h-5 w-5 mr-2"
                />
                <span className="text-[#4A5E6D] font-semibold">
                  {course.approvalStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
