import { Job, TechCategory, SocialLink } from "./types";
import {
  Linkedin,
  Github,
  Facebook,
  Mail,
  Phone,
} from "lucide-react";

// Import images from src/images
import profilePic1 from "./images/profile-picture.png";
import profilePic2 from "./images/profile-picture-2.png";
import profilePic3 from "./images/profile-picture-3.png";
import cimplicoLogo from "./images/cimplico-logo.png";
import fgsLogo from "./images/fgs-logo.png";
import roidnaLogo from "./images/roidna-logo.png";
import wesLogo from "./images/wes-logo.png";
import twoFLogo from "./images/2f-logo.png";
import webpropellersLogo from "./images/webpropellers-logo.png";
import asmLogo from "./images/asm-logo.png";
import puzzleLogo from "./images/puzzle-logo.png";
import alloroLogo from "./images/alloro-logo.png";

// Navigation
export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Technologies", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];

// Hero Content
export const HERO_CONTENT = {
  greeting: "Hi, my name is",
  name: "Rustine Dave",
  tagline: "Functional. Fun. Never boring.",
  taglineGradientPart: "That's how I build software.",
  description:
    "Building apps with AI. Functional, impactful, and never boring. With 5+ years of modern solutions engineering experience, I turn complex problems into products people genuinely enjoy with AI.",
  cta: "Check out my Resume",
  resumePdf: "/files/Resume.pdf",
};

// About Content
export const ABOUT_CONTENT = {
  heading: "About me — I just love programming!",
  paragraphs: [
    "Hey, I'm Rustine Dave. A full-stack engineer who genuinely enjoys solving problems and building smart software that feels alive.",
    "My love for engineering started early. Back in sixth grade, I got hooked on creating logic and understanding how systems think. That curiosity naturally evolved into a passion for modern web engineering, AI-driven development, and intelligent user experiences. Music is another constant in my life and it heavily influences how I design and build.",
    "I got my first web development role at 16, and from there the momentum never stopped. Since then, I've delivered solutions across multiple industries, working with a digital marketing agency, a startup, and an outsourcing web development company. Along the way, I’ve built AI-powered features, integrated machine learning APIs, automated workflows, and shipped data-informed products using modern frameworks and cloud-native technologies.",
    "Today, I focus on engineering applications that blend performance, personality, and intelligence. Functional, people-first, and never boring.",
    "Check out my resume to explore the technologies, tools, and AI-driven systems I've worked with.",
  ],
  images: [profilePic1, profilePic2, profilePic3],
};

// Experience Data
export const EXPERIENCE_DATA: Job[] = [
  {
    id: "alloro",
    title: "AI Software Engineer",
    company: "Alloro (HamiltonWise & Associates)",
    location: "Chicago, USA",
    logo: alloroLogo,
    details: [
      "Spearheaded the development of a comprehensive AI-powered Dental Practice Management Software that delivers actionable insights and strategic action plans to help healthcare providers make data-driven decisions",
      "Architected and managed AWS cloud infrastructure including EC2, S3, Lambda, and RDS to ensure scalable and reliable application performance",
      "Implemented robust CI/CD pipelines to streamline deployment workflows and maintain code quality across environments",
      "Leveraged multiple LLM platforms including Claude, GPT, and Gemini to build intelligent features and automate complex workflows",
      "Managed WordPress and Squarespace websites for clients, handling creation, customization, and ongoing maintenance",
    ],
  },
  {
    id: "puzzlehr",
    title: "Software Engineer",
    company: "PuzzleHR",
    location: "Tampa, FL",
    logo: puzzleLogo,
    details: [
      "Spearheaded the development of 3 AI-driven products—both internal tools and client-facing applications—focused on streamlining human resource management processes",
      "Bridged the gap between technical teams and business stakeholders by effectively communicating complex technical concepts and project progress",
      "Maintained and optimized server infrastructure using Microsoft Azure cloud services, ensuring high availability and performance",
      "Managed version control and deployment workflows through Azure Repos and CI/CD Pipelines, enabling efficient and reliable releases",
      "Integrated LLM capabilities using ChatGPT and Claude APIs to build intelligent automation features and enhance product functionality",
    ],
  },
  {
    id: "asm",
    title: "Web Specialist",
    company: "ActualSEO Media",
    location: "Houston, TX",
    logo: asmLogo,
    details: [
      "Implemented technical SEO optimizations including meta tags, schema markup, site speed improvements, and crawlability fixes to boost search engine rankings",
      "Designed and developed responsive, conversion-focused web pages aligned with client branding and marketing objectives",
      "Diagnosed and resolved issues on existing WordPress websites, including plugin conflicts, theme errors, and performance bottlenecks",
      "Provisioned and configured new WordPress installations from scratch, including hosting setup, theme customization, and plugin integration",
      "Collaborated with the SEO team to ensure all web development work aligned with search engine best practices and content strategies",
    ],
  },
  {
    id: "cimplico",
    title: "Full-stack Web Developer",
    company: "Cimplico",
    location: "Brisbane, Australia",
    logo: cimplicoLogo,
    details: [
      "Contributed to the development of an accounting software built with technologies like React, Typescript, Express, among others.",
      "Developed business logic for complex features with javascript",
      "Translated figma mockups to ReactTS components with precision and accuracy",
    ],
  },
  {
    id: "fgs",
    title: "Full-stack Web Developer",
    company: "FGS Advisory",
    location: "Sydney, Australia",
    logo: fgsLogo,
    details: [
      "Contributed to the development of a web-based PDF editor targeted for accounting firms with Laravel and Javascript",
      "Implemented complex, calculation-dense features like page rotation logic (algebra and geometry), and undo-redo (sorting algorithms) among others",
      "Designed and presented quick mockups for features and additional pages",
    ],
  },
  {
    id: "roidna",
    title: "Engineering Dep. Consultant",
    company: "ROI·DNA",
    location: "San Francisco, California, USA",
    logo: roidnaLogo,
    details: [
      "Added features to existing medium to large-scaled WordPress and Laravel + React projects",
      "Handled multiple client projects simultaneously on different tech-stacks",
      "Reported, and formulated solutions for bugs on numerous projects",
    ],
  },
  {
    id: "wes",
    title: "Web Development Consultant",
    company: "wesmcdowell.com",
    location: "Chicago, USA",
    logo: wesLogo,
    details: [
      "Employer is a youtuber/digital strategy expert with a quarter of a million subscribers and thousands of students",
      "Maintained website and fixed urgent bugs",
      "Helped on the technical side - ie, opening, and closing campaign pages - during course campaigns in a time-sensitive environment",
      "Create new pages, and update existing ones with Elementor + WordPress",
    ],
  },
  {
    id: "2f",
    title: "Web Development Consultant",
    company: "2fsolutions.com",
    location: "Italy",
    logo: twoFLogo,
    details: [
      "Developed websites with Vue + Laravel or WordPress, depending on client requirements",
      "Troubleshot, optimized, and formulated solutions for faulty, existing websites",
    ],
  },
  {
    id: "webpropellers",
    title: "WordPress Developer",
    company: "Web Propellers",
    location: "Davao, Philippines",
    logo: webpropellersLogo,
    details: [
      "Developed and handled different types websites for an array of industries",
      "Engineered web solutions to accommodate brilliant business ideas and provided outstanding technical support for english, and non-english clients",
      "Spun up and maintained virtual compute machines from scratch for different types of project",
      "Exposed to bash terminal and operated virtual machines remotely",
      "Utilized AWS services like S3, Route 53, Lambda, RDS, etc. for different business requirements",
      "Migrated websites to different hosting services",
    ],
  },
];

// Technologies Data
export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Front-End",
    items: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      { name: "Redux Toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      {
        name: "VueJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      },
      {
        name: "NuxtJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
      },
      {
        name: "SASS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      },
      {
        name: "JQuery",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
      },
      {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
    ],
  },
  {
    title: "Back-End",
    items: [
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      {
        name: "NodeJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
      {
        name: "GCP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
    ],
  },
  {
    title: "Beyond",
    items: [
      { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
      {
        name: "WooCommerce",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg",
      },
    ],
  },
];

// Contact Data
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/rustine-dave-235a51237/",
    icon: <Linkedin />,
  },
  { platform: "GitHub", url: "https://github.com/lagdave/", icon: <Github /> },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61585996447935",
    icon: <Facebook />,
  },
  { platform: "Email", url: "mailto:hi@rustinedave.com", icon: <Mail /> },
  { platform: "WhatsApp", url: "https://wa.me/+639505425118", icon: <Phone /> },
];
