export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  date: string;
  description: string;
  gallery: string[];
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "JEPRETIN - A Location-Based Photography and Videography Marketplace Platform",
    category: "Web Development",
    date: "September 2025",
    image: "/projects/project 2/1.1.jfif",
    tags: [
      "Node.js", "Express.js", "PostgreSQL", "Prisma", 
      "REST API", "JWT", "Midtrans", "Swagger", "Jest", "Backend Development"
    ],
    description: `JEPRETIN is a location-based marketplace platform designed to connect customers with photography and videography service providers. The platform helps users discover providers, explore their portfolios and service packages, place orders, and manage transactions through an integrated system.

The backend was developed to support core marketplace operations, including user authentication, provider management, service coverage, portfolio, booking and order management, payment processing, wallet, withdrawal, reviews, notifications, and other supporting features.

The database was designed using PostgreSQL and Prisma, with structured relationships between users, providers, orders, payments, and other entities to support the application's business processes.

Authentication and authorization were implemented using JWT, role-based access, password hashing, middleware, and refresh tokens. The payment system was integrated with Midtrans, including webhook handling for payment status updates.

The application also includes comprehensive REST API documentation using Swagger and automated testing using Jest. The backend was deployed to Railway and developed collaboratively using GitHub with branching, pull requests, merging, and conflict resolution.`,
    gallery: [
      "/projects/project 2/1.1.jfif",
      "/projects/project 2/1.2.jfif",
      "/projects/project 2/1.3.jfif",
      "/projects/project 2/1.4.jfif",
      "/projects/project 2/1.5.jfif",
      "/projects/project 2/1.6.jfif"
    ]
  },
  {
    id: "2",
    title: "Sky Ticket - A Web-Based Flight Ticket Booking Platform",
    category: "Web Development",
    date: "December 2024",
    image: "/projects/project 1/Screenshot 2024-12-27 184243.png",
    tags: [
      "Node.js", "Express.js", "PostgreSQL", "Prisma", 
      "REST API", "JWT", "Google OAuth", "Redis", "AWS", "GitHub Actions", "Jest"
    ],
    description: `Sky Ticket is a web-based flight ticket booking platform developed as the final project of the MSIB Batch 7 Studi Independen program. The project was developed collaboratively by a team of 8 members consisting of 4 frontend developers and 4 backend developers.

The platform provides a system for users to search and book flights, manage passenger information, select seats, and process flight ticket bookings through an integrated backend system.

The database was designed using PostgreSQL and Prisma, including relationships between users, bookings, passengers, tickets, flights, airports, airlines, aircraft, and seat management.

The authentication system was implemented using JWT, role-based access, middleware, password hashing, refresh tokens, email OTP, and Google OAuth. Redis was used as a caching mechanism, while node-cron was implemented to automate the removal of expired tokens.

The backend provides REST APIs documented using Swagger and tested using Jest. The application was deployed to AWS using CI/CD with GitHub Actions.

The project was developed collaboratively using Git and GitHub through branching, pull requests, merging, and conflict resolution, with ClickUp used for project progress tracking. The project was also presented to MSIB mentors and stakeholders.`,
    gallery: [
      "/projects/project 1/Screenshot 2024-12-27 184243.png",
      "/projects/project 1/Screenshot 2024-12-27 211520.png",
      "/projects/project 1/Screenshot 2024-12-27 211632.png",
      "/projects/project 1/Screenshot 2024-12-27 215444.png",
      "/projects/project 1/Screenshot 2024-12-27 215456.png",
      "/projects/project 1/Screenshot 2024-12-27 220606.png",
      "/projects/project 1/Screenshot 2024-12-27 221259.png",
      "/projects/project 1/Screenshot 2024-12-27 221455.png",
      "/projects/project 1/Screenshot 2024-12-27 221518.png"
    ]
  },
  {
    id: "3",
    title: "BWeather - A Mobile Weather Detection Application",
    category: "Mobile Development",
    date: "2024",
    image: "/projects/project 3/Slide Dark 1.png",
    tags: [
      "Mobile Development", "Project Management", 
      "System Development", "Teamwork", "Problem Solving"
    ],
    description: `BWeather is a mobile weather detection application developed as a team project for the Pekan Inovasi Fakultas Teknik. The project was developed collaboratively to provide weather-related information through a mobile application.

The project involved multiple stages of development, including project planning, analysis, system development, and collaboration between team members. I contributed as the Project Manager, coordinating the team and helping manage the development process from planning through project presentation.

The project provided experience in team coordination, project management, communication, problem solving, and decision making during the development process.`,
    gallery: [
      "/projects/project 3/Slide Dark 1.png",
      "/projects/project 3/Slide Dark 2.png",
      "/projects/project 3/Slide Light 1.png",
      "/projects/project 3/Slide Light 2.png",
      "/projects/project 3/Slide Light 5.png"
    ]
  },
  {
    id: "4",
    title: "Multi-Object Detection for Hiker Logistics (YOLOv8 Nano)",
    category: "Artificial Intelligence / Computer Vision",
    date: "2026",
    image: "/projects/project 4/Screenshot 2026-05-11 225527.png",
    tags: [
      "YOLOv8", "Computer Vision", "Object Detection", 
      "Roboflow", "Machine Learning", "Research"
    ],
    description: `This project is a research-based computer vision project developed as part of my undergraduate thesis in Information Systems. The research evaluates the performance of the YOLOv8 Nano model for detecting multiple hiking logistics objects based on visual density.

The dataset was independently collected and prepared using Roboflow, then used to train the YOLOv8 Nano model for multi-object detection.

The research evaluates the model's detection capability under different levels of visual object density, with a focus on determining how the model performs when multiple logistics objects appear within a single image.

The project combines data preparation, model training, object detection, and performance evaluation as part of an undergraduate research process.`,
    gallery: [
      "/projects/project 4/Screenshot 2026-05-11 225527.png",
      "/projects/project 4/Screenshot 2026-05-03 153108.png",
      "/projects/project 4/Screenshot 2026-05-11 222642.png",
      "/projects/project 4/Screenshot 2026-05-31 020326.png"
    ]
  }
];
