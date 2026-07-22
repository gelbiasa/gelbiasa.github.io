export const projects = [
  {
    id: 1,
    title: 'Enterprise BOM (Bill of Materials) Management System',
    subtitle: 'PT Multi Spunindo Jaya Tbk.',
    category: 'Intern',
    description:
      'Engineered a comprehensive manufacturing system with dedicated modules for Jumbo, Slitter, and Meltblown lines. Executed complex database migrations and authored detailed system manual books for production handover.',
    detail:
      'The system handles complex Bill of Materials structures tailored for industrial manufacturing lines. Focus was on accurate material tracking, minimizing waste, and seamless full-stack integration for factory operations.',
    image: '/images/PWL_POS.png', // Temporary placeholder
    tags: ['Laravel', 'MySQL', 'Full-Stack'],
    links: [],
    featured: true,
  },
  {
    id: 2,
    title: 'PPID Polinema Web Application',
    subtitle: 'UPA TIK Polinema',
    category: 'Intern',
    description:
      'Developing a web application for PPID Politeknik Negeri Malang using Laravel, PHP, MySQL, and JavaScript. The system includes Public Information, User Access Management, and Activity Log modules, with Summernote Editor integration.',
    detail:
      'The database is designed with MySQL Workbench to ensure data integrity and scalability. Development focuses on efficiency by implementing Laravel Traits for common functions such as soft delete, logging, file management, and response formatting.',
    image: '/images/ppid_upa_tik.jpeg',
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Laravel Modules'],
    links: [
      { label: 'GitHub', url: 'https://github.com/gelbiasa/ppid', icon: 'github' },
    ],
    featured: true,
  },
  {
    id: 3,
    title: 'Customer Satisfaction Survey Website',
    subtitle: 'Native HTML, CSS, JavaScript & PHP',
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
    subtitle: 'Full-Stack Laravel Application',
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
    subtitle: 'Compensation Management System',
    category: 'Academic',
    description:
      'A web-based student compensation management system using Laravel and MySQL for the Information Technology Department at Politeknik Negeri Malang.',
    detail:
      'Designed to assist in managing compensations for students with "alpha" attendance records. Provides mechanisms for assigning and completing substitute tasks with a responsive, accessible interface.',
    image: '/images/Web_Kompensasi.png',
    tags: ['Laravel', 'MySQL', 'PHP', 'Figma'],
    links: [
      { label: 'GitHub', url: 'https://github.com/gelbiasa/Website-E-Kompen', icon: 'github' },
      { label: 'UI/UX', url: 'https://www.figma.com/design/orqBJKFvyQ3Md3CNhgzZ4i/prototype-pbl', icon: 'figma' },
      { label: 'Live Demo', url: 'http://160.19.167.28/register', icon: 'external' },
    ],
    featured: true,
  },
  {
    id: 6,
    title: 'E-Kompen Mobile App',
    subtitle: 'Flutter Cross-Platform Application',
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
      { label: 'Download', url: 'https://drive.google.com/file/d/1u59yXPYGMYtfrf2ig7RStmj2B_pckIz1/view', icon: 'download' },
    ],
    featured: false,
  },
]
