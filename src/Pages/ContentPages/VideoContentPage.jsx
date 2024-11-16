import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cours } from "../../DummyData/CoursesDummyData";

const VideoContentPage = () => {
  const { id } = useParams(); // Get the dynamic 'id' parameter from the URL
  const [videoContent, setVideoContent] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const video = findContentById(id, "video");
    if (video) {
      setVideoContent(video);

      setLoading(false); // Content loaded successfully
    } else {
      setLoading(false); // Content not found, stop loading
      setError("Video content not found.");
    }
  }, [id]);

  // Find the specific content in the course modules based on content type and ID
  const findContentById = (contentId, contentType) => {
    for (let module of cours.trainingModules) {
      const content = module.trainingModuleContents.find(
        (content) => content.id === contentId && content.type === contentType
      );
      if (content) {
        return content;
      }
    }
    return null;
  };

  // Function to handle video metadata (duration)
  const handleVideoLoadedData = (event) => {
    const video = event.target;
    setVideoDuration(video.duration); // Set the video duration
  };

  // Fallback in case video fails to load
  const handleVideoError = () => {
    setError("There was an error loading the video. Please try again later.");
  };

  
  return (
    <div className="pt-[80px] px-4 bg-gray-50 md:px-8 h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loader"></div> {/* Loading spinner */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : videoContent ? (
        <div className="h-[600px]">
          {/* Lesson Number */}
          <div className="text-l font-semibold mb-4">
            Video: {videoContent.title[0]?.value || "N/A"}
          </div>

          {/* Video */}
          <div className="mt-4 h-full">
            {/* <video
              controls
              className="w-full mt-4 rounded-lg"
              onLoadedData={handleVideoLoadedData} // Handle video loaded data to get the duration
              onError={handleVideoError} // Handle video loading error
            >
              <source
                src={`https://drive.google.com/file/d/${videoContent.id}/preview`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}

            <iframe
              src={`https://drive.google.com/file/d/${videoContent.id}/preview`}
             className="w-full h-full mt-4 rounded-lg"
            ></iframe>
          </div>

          {/* Video Duration */}
          {videoContent.duration && (
            <div className="text-sm text-gray-500 mt-2">
              Video Duration: {videoContent.duration} minutes
            </div>
          )}

          {/* Content Title */}
          {/* <h2 className="text-2xl font-semibold mt-4">
            {videoContent.title[0].value || "No title available"}
          </h2> */}
        </div>
      ) : (
        <p className="text-center">
          Video content is not available at the moment.
        </p>
      )}
    </div>
  );
};

// Helper function to format time (seconds to mm:ss format)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export default VideoContentPage;
