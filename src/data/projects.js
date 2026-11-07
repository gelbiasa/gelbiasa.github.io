export const projects = [
  {
    id: 1,
    title: 'Enterprise BOM (Bill of Materials) Management System',
    subtitle: 'PT Multi Spunindo Jaya Tbk. - Full-Stack Developer',
    category: 'Intern',
    description:
      'An enterprise Bill of Materials (BOM) manufacturing system for Jumbo, Slitter, and Meltblown production lines at PT Multi Spunindo Jaya Tbk, featuring real-time SAP API material validation, automated scrap & quantity calculations, and multi-tier approval workflows.',
    detail:
      'A Bill of Materials (BOM) serves as the definitive production blueprint specifying components, raw materials, and assembly ratios required by manufacturing, engineering, procurement, and QC teams. This Enterprise BOM Management System was engineered to manage integrated BOM structures across the Jumbo, Slitter, and Meltblown lines at PT Multi Spunindo Jaya Tbk. Key capabilities include multi-level version-controlled Master BOM management, real-time SAP API integration to validate material availability and prevent operational discrepancies, and automated calculation engines for precise material quantities, scrap factor adjustments, and production formula simulations. The platform also incorporates multi-tier approval workflows, dynamic analytical reporting with comprehensive filters, and standardized document export to ensure seamless factory operations and minimal material waste.',
    image: [
      '/images/Intern/Spunindo/Project/page 1.png',
      '/images/Intern/Spunindo/Project/page 2.png',
      '/images/Intern/Spunindo/Project/page 3.png',
      '/images/Intern/Spunindo/Project/page 4.png'
    ],
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Bootstrap', 'jQuery', 'DataTables', 'RESTful API (SAP)', 'Git/GitLab', 'VS Code', 'Figma', 'Draw.io'],
    links: [],
    featured: true,
  },
  {
    id: 2,
    title: 'PPID Polinema Web Application',
    subtitle: 'UPA TIK Politeknik Negeri Malang - Backend Developer',
    category: 'Intern',
    description:
      'A digital public information service platform for Politeknik Negeri Malang, engineered with modular Laravel architecture, SSO integration, granular RBAC access control, dynamic e-forms, and automated notification workflows.',
    detail:
      'PPID Polinema serves as the official digital gateway for public information disclosure at Politeknik Negeri Malang, enabling students, faculty, and the public to access campus policies, request institutional documents, and track application progress transparently. The system adopts a modular Laravel architecture that cleanly segregates internal administrative operations (Sisfo module) from the public service portal (User module). Key engineering implementations include granular Role-Based Access Control (RBAC), institutional Single Sign-On (SSO) integration for academic credentials, and reusable Laravel Traits for activity logging, soft deletes, and standardized responses. The core business process automates the end-to-end e-form lifecycle: from public inquiry submission and automated data validation to internal disposition delegation and real-time response delivery via SMTP email and WhatsApp Gateway (Foonte).',
    image: [
      '/images/Intern/UPA_TIK/project/page 1.png',
      '/images/Intern/UPA_TIK/project/page 2.png',
      '/images/Intern/UPA_TIK/project/page 3.png',
      '/images/Intern/UPA_TIK/project/page 4.png',
      '/images/Intern/UPA_TIK/project/page 5.png',
      '/images/Intern/UPA_TIK/project/page 6.png',
      '/images/Intern/UPA_TIK/project/page 7.png'
    ],
    tags: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap 5', 'Blade', 'HTML5/SCSS', 'jQuery', 'DataTables', 'RESTful API', 'Laravel Modules', 'Vite', 'JWT Auth', 'WhatsApp Gateway (Foonte)', 'SMTP', 'Git', 'Postman', 'VS Code', 'Draw.io'],
    links: [],
    featured: true,
  },
  {
    id: 3,
    title: 'Customer Satisfaction Survey Website',
    subtitle: 'Politeknik Negeri Malang - Full-Stack Developer',
    category: 'Academic',
    description:
      'A customer satisfaction survey web application using native technologies. Designed to help businesses efficiently collect, manage, and analyze customer feedback with visual reports.',
    detail:
      'The website includes customizable survey forms with features such as scale ratings, multiple-choice questions, and open-text fields. Survey data is stored in a database and displayed as visual reports including tables and charts.',
    image: '/images/Survey_Kepuasan.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    links: [
      { label: 'GitHub', url: 'https://github.com/gelbiasa/Pemograman-web/tree/main/project', icon: 'github' },
      { label: 'UI/UX', url: 'https://www.figma.com/proto/foN9oAhkRk8JqYEagwmZcb/Tampilan-web-Survey?node-id=14-2585', icon: 'figma' },
    ],
    featured: false,
  },
  {
    id: 4,
    title: 'Point of Sales (POS) Website',
    subtitle: 'Politeknik Negeri Malang - Full-Stack Developer',
    category: 'Academic',
    description:
      'A web-based POS application using Laravel and MySQL, supporting business operations in managing transactions, inventory, and sales reports efficiently.',
    detail:
      'Features multi-user functionality with different access levels (administrators, cashiers, managers). Responsive interface with data export to Excel and PDF for business analysis and decision-making.',
    image: '/images/PWL_POS.png',
    tags: ['Laravel', 'MySQL', 'PHP', 'JavaScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/gelbiasa/PWL_POS', icon: 'github' },
    ],
    featured: false,
  },
  {
    id: 5,
    title: 'E-Kompen Web Application',
    subtitle: 'Politeknik Negeri Malang - Full-Stack Developer',
    category: 'Academic',
    description:
      'A web-based student compensation management system using Laravel and MySQL for the Information Technology Department at Politeknik Negeri Malang.',
    detail:
      'Designed to assist in managing compensations for students with "alpha" attendance records. Provides mechanisms for assigning and completing substitute tasks with a responsive, accessible interface.',
    image: '/images/Web_Kompensasi.png',
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'Figma'],
    links: [
      { label: 'GitHub', url: 'https://github.com/gelbiasa/Website-E-Kompen', icon: 'github' },
      { label: 'UI/UX', url: 'https://www.figma.com/design/orqBJKFvyQ3Md3CNhgzZ4i/prototype-pbl', icon: 'figma' },
    ],
    featured: true,
  },
  {
    id: 6,
    title: 'E-Kompen Mobile App',
    subtitle: 'Politeknik Negeri Malang - Mobile Developer',
    category: 'Academic',
    description:
      'A mobile application for student compensation management at Politeknik Negeri Malang, built with Flutter and an API-based architecture for both Android and iOS.',
    detail:
      'Designed with a responsive interface to ensure accessibility across various devices. The system makes the compensation process more structured, transparent, and easy to manage.',
    image: '/images/Mobile_Kompensasi.png',
    tags: ['Flutter', 'Dart', 'REST API', 'Figma'],
    links: [
      { label: 'GitHub', url: 'https://github.com/gelbiasa/Mobile-E-Kompen', icon: 'github' },
      { label: 'UI/UX', url: 'https://www.figma.com/design/orqBJKFvyQ3Md3CNhgzZ4i/prototype-pbl', icon: 'figma' },
    ],
    featured: false,
  },
  {
    id: 7,
    title: 'GelbySight (GitHub Analytics & Dynamic README Card)',
    subtitle: 'Personal Project - Full-Stack Developer',
    category: 'Personal',
    description:
      'Developing a comprehensive web analytics application for GitHub profiles using Next.js, TypeScript, and Hono.js. The system includes an interactive dashboard to visualize detailed statistics, an automated grading algorithm system to rank user profiles, and a real-time Dynamic SVG Card generator to be embedded directly into GitHub profile READMEs.',
    detail:
      'The Backend API is built on Cloudflare Workers edge computing infrastructure using Hono.js to ensure ultra-low latency and high scalability. Development heavily focuses on performance and aesthetics: utilizing GitHub GraphQL API for efficient data fetching, implementing an advanced caching system to handle API rate limits, and using the Satori engine to dynamically convert HTML/Tailwind layouts into premium, pixel-perfect SVG assets.',
    image: [
      '/images/Personal/Project/GelbySight/Image 1.png',
      '/images/Personal/Project/GelbySight/Image 2.png',
      '/images/Personal/Project/GelbySight/Image 3.png',
      '/images/Personal/Project/GelbySight/Image 4.png',
      '/images/Personal/Project/GelbySight/Image 5.png'
    ],
    tags: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Hono.js', 'Cloudflare Workers', 'Satori', 'GraphQL'],
    links: [
      { label: 'Visit', url: 'https://gelbysight.vercel.app/', icon: 'external', transKey: 'visit' }
    ],
    featured: true,
  },
]
