
import image1 from "../Images/Skulebas-1.jpg";

export const coursesList = [
    {
      _id: "1",
      title: [{ value: "Vessel Tank Inspection Safety" }],
      description: [
        {
          value:
            "This comprehensive and critical safety training module is designed to address the real-life hazards associated with cargo tank inspections, emphasizing the importance of preventative measures to avert fatal accidents in high-risk environments.",
        },
      ],
      createdAt: "2024-01-01T10:00:00Z",
      lastModified: "2024-02-15T15:00:00Z",
      status: "PUBLISHED",
      durationHours: 10,
      certifications: [{ value: "Web Development Certification" }],
      images: [{ url: image1 }],
      createdBy: { firstName: "John" },
    },
    {
      _id: "2",
      title: [{ value: "Vessel Stability and Loading Safety" }],
      description: [
        {
          value:
            "This course covers the principles of vessel stability, focusing on loading and unloading processes to prevent capsizing and ensure safe voyages in various sea conditions.",
        },
      ],
      createdAt: "2024-01-10T11:00:00Z",
      lastModified: "2024-03-01T12:00:00Z",
      status: "PUBLISHED",
      durationHours: 8,
      certifications: [{ value: "Vessel Stability Certification" }],
      images: [{ url: image1 }],
      createdBy: { firstName: "Jane" },
    },
    {
      _id: "3",
      title: [{ value: "Vessel Fire Safety Training" }],
      description: [
        {
          value:
            "This course focuses on fire prevention, detection, and firefighting techniques specifically for vessels. It covers onboard fire systems, fire safety equipment, and emergency response protocols.",
        },
      ],
      createdAt: "2024-02-05T09:30:00Z",
      lastModified: "2024-02-20T14:00:00Z",
      status: "PUBLISHED",
      durationHours: 12,
      certifications: [{ value: "Vessel Fire Safety Certification" }],
      images: [{ url: image1 }],
      createdBy: { firstName: "Alice" },
    },
    {
      _id: "4",
      title: [{ value: "Vessel Safety and Emergency Response" }],
      description: [
        {
          value:
            "An essential course for understanding the safety measures and emergency response strategies aboard vessels, including evacuation plans, lifeboat drills, and maritime safety regulations.",
        },
      ],
      createdAt: "2024-03-01T13:00:00Z",
      lastModified: "2024-03-10T16:30:00Z",
      status: "PUBLISHED",
      durationHours: 15,
      certifications: [{ value: "Maritime Safety and Emergency Response" }],
      images: [{ url: image1 }],
      createdBy: { firstName: "Bob" },
    },
  ];
  
 

export const cours = {
    title: [{ value: "Vessel Tank Inspection Safety" }],
    authorName: "John Doe",
    status: "PUBLISHED",
    description: [{ value: "This comprehensive and critical safety training module is designed to address the real-life hazards associated with cargo tank inspections, emphasizing the importance of preventative measures to avert fatal accidents in high-risk environments. Cargo tank inspections are essential but inherently dangerous tasks, requiring a clear understanding of the risks involved and the safety protocols that must be followed. This course leverages real-world case studies, industry best practices, and expert insights to raise awareness about the wide range of potential dangers encountered during cargo tank inspections. These include hazardous atmospheres, fire and explosion risks, equipment malfunctions, human error, and inadequate safety measures. By studying the causes and consequences of past incidents, participants will learn how to recognize, mitigate, and control these hazards effectively." }],
    durationHours: 12,
    courseLevel: "2 Lessons",
    lessons:2,
    assessment: 4,
    approvalStatus: "Certificate on completion",
    thumbnail: image1,
    updatedAt: "2024-03-10T16:30:00Z",
    trainingModules: [
      {
        id: 1, // Added module ID
        title: [{ value: "Fatal Accident During Cargo Tank Inspection" }],
        trainingModuleContents: [
          { id: "1fhOei_1T-Vo15tXQM5geVzomM4dl78DI", title: [{ value: "Safe Atmosphere and Gas Freeing Procedures Training" }], type: "video", duration: 3.23 },
          { id: "Safe_Atmosphere_and_Gas_Freeing_Procedures_Training", title: [{ value: "Safe Atmosphere and Gas Freeing Procedures Training" }], type: "quiz", duration:30 },
          { id: "1aBqB8NHS4I_UYt_LZWD0wnhDlqB9IpC2", title: [{ value: "Safety Protocols Enclosed Space Entry Training" }], type: "video",duration: 5.53 },
          { id: "Safety_Protocols_Enclosed_Space_Entry_Training", title: [{ value: "Safety Protocols Enclosed Space Entry Training" }], type: "quiz", duration:30 },
          { id: "1cMJgPftEdr4TMh9WMhOpBuziMKZqvE9m", title: [{ value: "Stop Work Authority Procedures Course" }], type: "video",duration: 5.53  },
          { id: "Stop_Work_Authority_Procedures_Course", title: [{ value: "Stop Work Authority Procedures Course" }], type: "quiz", duration:30 },
          { id: "1w2a6LMkuqucupwlDxsthm_1bGBlDctAS", title: [{ value: "Stop Work Authority Safety Procedures" }], type: "video", duration:6.25 },
          { id: "Stop_Work_Authority_Safety_Procedures", title: [{ value: "Stop Work Authority Safety Procedures" }], type: "quiz", duration:30 },
          { id: "1X0BIr8Bz1BbAp8jOemzLGkGMmW87oQ7i", title: [{ value: "Maersk Tangier" }], type: "document", duration:30 },
          { id: "1H--zzaA0ZWB8vTwDnw-j8x1CrsLwpp14", title: [{ value: "Maersk Tangier enclosed sapce fatality" }], type: "PPT", duration:30 },
        ],
      },
      {
        id: 2, // Added module ID
        title: [{ value: "CSS Fundamentals" }],
        trainingModuleContents: [
          
        ],
      },
    ],
  };
  