import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cours } from "../../DummyData/CoursesDummyData";

const DocumentContentPage = () => {
  const { id } = useParams();
  const [documentContent, setDocumentContent] = useState(null);

  useEffect(() => {
    const document = findContentById(id, "document");
    setDocumentContent(document);
  }, [id]);

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

  return (
    <div className="mt-[60px] w-full">
      {documentContent ? (
        <div className="h-full">
          <iframe
            style={{ height: "calc(100vh - 80px" }}
            src={`https://drive.google.com/file/d/${documentContent.id}/preview`}
            className="w-full mt-4"
            title={documentContent?.title[0].value} 
            loading="lazy"
          />
        </div>
      ) : (
        <p>Loading document content...</p>
      )}
    </div>
  );
};

export default DocumentContentPage;
