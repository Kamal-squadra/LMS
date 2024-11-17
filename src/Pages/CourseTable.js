import React, { useState, useEffect } from "react";
import { coursesList } from "../DummyData/CoursesDummyData";
import { useNavigate } from "react-router-dom";
import lockIcon from "../icons/lock-closed.svg"; // Lock icon for locked courses
import videoIcon from "../icons/video-icon.svg"; // Video icon
import documentIcon from "../icons/doc-icon.svg"; // Document icon
import assessmentIcon from "../icons/star-icon.svg"; // Assessment icon
import clockIcon from "../icons/clock-icon.svg"; // Clock icon
import bookIcon from "../icons/PPT.svg"; // PPT icon
import image1 from "../Images/Skulebas-1.jpg"; // Sample image

const CourseTable = () => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredCourses, setFilteredCourses] = useState(coursesList);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Filter courses based on search term
    const filtered = coursesList.filter((course) => {
      const titleMatch = course.title.some((t) =>
        t.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const authorMatch = course.createdBy?.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || authorMatch;
    });
    setFilteredCourses(filtered);
  }, [searchTerm]);

  const handleSort = () => {
    const sortedCourses = [...filteredCourses].sort((a, b) => {
      const dateA = new Date(a.lastModified);
      const dateB = new Date(b.lastModified);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setFilteredCourses(sortedCourses);
  };

  const navigateToCourseDetails = (courseId) => {
    navigate(`/course-preview`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="pt-[80px] h-full px-4 bg-gray-100">
      <input
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 w-full border rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            return (
              <div
                key={course._id}
                onClick={() => navigateToCourseDetails(course._id)}
                className="bg-white border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative flex-grow">
                  <img
                    src={course.images[0]?.url || image1} // Fallback image
                    alt={course.title[0]?.value}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {/* Lock Icon Overlay */}
                  {!course.isCertificate && (
                    <img
                      src={lockIcon}
                      alt="Locked"
                      className="absolute top-0 right-0 w-12 h-12 m-2"
                    />
                  )}
                </div>
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{course.title[0]?.value}</h3>
                    <p className="text-sm text-gray-600 mb-2">{truncateText(course.description[0]?.value, 80)}</p>
                  </div>
                  {/* Icon Section moved to the bottom */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <div className="flex items-center">
                      <img src={clockIcon} alt="Duration" className="w-5 h-5 mr-2" />
                      <span>{course.durationHours} hrs</span>
                    </div>
                    <div className="flex items-center">
                      <img src={videoIcon} alt="Lessons" className="w-5 h-5 mr-2" />
                      <span>{course.courseLevel}</span>
                    </div>
                    {course.certifications?.length > 0 && (
                      <div className="flex items-center">
                        <img
                          src={assessmentIcon}
                          alt="Certification"
                          className="w-5 h-5 mr-2"
                        />
                        <span>Certification</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-4 text-center py-4">No courses found.</div>
        )}
      </div>
    </div>
  );
};

export default CourseTable;
