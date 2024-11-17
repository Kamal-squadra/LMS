import React, { useState, useEffect } from "react";
import { coursesList } from "../DummyData/CoursesDummyData";
import { useNavigate } from "react-router-dom";
import lockIcon from "../icons/lock-closed.svg"; // Assuming you have the lock.svg icon

const CourseTable = () => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Sample static data
  const [courses, setCourses] = useState(coursesList);

  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleSort = () => {
    const sortedCourses = [...filteredCourses].sort((a, b) => {
      const dateA = new Date(a.lastModified);
      const dateB = new Date(b.lastModified);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setFilteredCourses(sortedCourses);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = courses.filter((course) => {
      const titleMatch = course.title.some((t) =>
        t.value.toLowerCase().includes(searchTerm)
      );
      const authorMatch = course.createdBy?.firstName
        .toLowerCase()
        .includes(searchTerm);
      return titleMatch || authorMatch;
    });
    setFilteredCourses(filtered);
  };

  const toggleDropdown = (courseId) => {
    setActiveDropdown((prev) => (prev === courseId ? null : courseId));
  };

  const navigate = useNavigate();
  const navigateToCourseDetails = (courseId) => {
    navigate(`/course-preview`);
  };

  return (
    <div className="overflow-x-auto pt-[80px] px-4 min-w-[1060px] bg-gray-100">
      <table className="border-b bg-white rounded-t-lg w-full border-gray-200 table-fixed">
        <thead>
          <tr className=" h-[50px]">
            <th className="py-2 px-4 text-start">Name</th>
            {/* <th
              className="py-2 px-4 cursor-pointer text-start w-[200px]"
              onClick={handleSort}
            >
              Last Modified {sortDirection === "asc" ? "↑" : "↓"}
            </th> */}
          </tr>
        </thead>
      </table>
      <div
        style={{ height: "calc(100vh - 140px)", scrollbarWidth: "none" }}
        className="overflow-y-auto custom-scrollbar"
      >
        <table className="border-t-0 border-[#DFE4EA] w-full table-fixed">
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => {
                const isFirstItem = index === 0;
                return (
                  <tr
                    key={course._id}
                    onClick={isFirstItem ? navigateToCourseDetails : null}
                    className={`hover:bg-gray-50 border-b bg-white cursor-pointer ${
                      !isFirstItem ? "opacity-40 pointer-events-none relative" : ""
                    }`}
                  >
                    <td className="p-4 flex items-center gap-3 border-0">
                      <div className="relative h-[107px] w-[146px]">
                        {/* Ensure the image has a fixed size and doesn't shrink */}
                        <img
                          src={course.images[0]?.url}
                          alt={course.title}
                          className="h-[107px] w-[146px] object-cover rounded-lg"
                        />
                        {/* Lock Icon Overlay for Non-First Item */}
                        {!isFirstItem && (
                          <img
                            src={lockIcon} // Path to lock SVG
                            alt="Locked"
                            className="absolute top-0 right-0 w-12 h-12 m-2"
                          />
                        )}
                      </div>
                      <div className="w-[70%]">
                        <h3>{course.title[0]?.value}</h3>
                        <p className="text-gray-500 text-[12px] mb-2">
                          {course.description[0]?.value}
                        </p>
                        <div className="flex items-center">
                          {course.certifications?.length > 0 && (
                            <span className="ml-2 bg-[#4361FF1A] flex items-center gap-2 text-[#0B7B69] text-[12px] py-[3px] px-[10px] rounded-full">
                              Certification
                            </span>
                          )}
                          {course.durationHours && (
                            <span className="ml-2 text-[14px] font-semibold text-gray-600">
                              Duration: {course.durationHours} hours
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* <td className="p-4 border-0 w-[200px]">
                      <span className="text-gray-600 text-[12px]">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                    </td> */}
                    
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
