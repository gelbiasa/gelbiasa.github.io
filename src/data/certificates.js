/**
 * Data Sertifikasi & Lisensi (Certifications & Credentials)
 * 
 * Anda dapat dengan mudah menambahkan sertifikat baru atau mengubah statusnya.
 * Panduan Pengisian:
 * - category: 'national' (BNSP/LSP) | 'course' (Dicoding/Kominfo/HackerRank/dll) | 'language' (TOEIC/TOEFL)
 * - status: 'available' (jika file PDF/gambar sudah ada) | 'upcoming' (jika masih wadah/segera diunggah)
 * - file: path ke file di folder public, misal: '/file/sertifikat/bnsp_software_engineer.pdf'
 * - credentialUrl: link verifikasi online resmi (jika ada, misal dari Dicoding/HackerRank/BNSP)
 */

export const certificateCategories = [
  { id: 'all', labelKey: 'certificates.categories.all' },
  { id: 'national', labelKey: 'certificates.categories.national' },
  { id: 'course', labelKey: 'certificates.categories.course' },
  { id: 'language', labelKey: 'certificates.categories.language' },
];

export const certificatesData = [
  {
    id: 'cert-bnsp-se',
    category: 'national',
    issuer: {
      id: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      en: 'National Professional Certification Board (BNSP)',
    },
    title: {
      id: 'Sertifikasi Kompetensi Rekayasa Perangkat Lunak (Software Engineering)',
      en: 'Competency Certification in Software Engineering (BNSP)',
    },
    scheme: {
      id: 'Skema Okupasi Software Developer / Rekayasa Perangkat Lunak',
      en: 'Occupational Scheme: Software Developer & Software Engineering',
    },
    issueDate: '2025',
    expiryDate: {
      id: 'Berlaku 3 Tahun',
      en: 'Valid for 3 Years',
    },
    credentialId: 'REG.BNSP-PLN-2025',
    credentialUrl: null,
    file: null, // Ganti dengan path file PDF ketika sudah ada, contoh: '/file/sertifikat/bnsp_se.pdf'
    status: 'upcoming', // 'available' | 'upcoming'
    badge: 'BNSP',
    iconType: 'shield',
    skills: ['Software Architecture', 'Database Design', 'UML & System Modeling', 'Code Standards', 'SDLC'],
    description: {
      id: 'Standarisasi kompetensi kerja nasional bidang pengembangan perangkat lunak, mencakup analisis kebutuhan, perancangan database terstruktur, implementasi logika pemrograman, dan pengujian sistem.',
      en: 'National standard competency certification in software development, covering requirements engineering, structured database design, core backend logic implementation, and system testing.',
    },
  },
  {
    id: 'cert-lsp-polinema',
    category: 'national',
    issuer: {
      id: 'LSP P1 Politeknik Negeri Malang',
      en: 'LSP P1 Politeknik Negeri Malang (National Standard)',
    },
    title: {
      id: 'Sertifikasi Kompetensi Pemrograman Web (Web Developer)',
      en: 'Competency Certification: Web Developer',
    },
    scheme: {
      id: 'Klaster Pemrograman Web & Arsitektur Database Berelasi',
      en: 'Cluster: Web Programming & Relational Database Architecture',
    },
    issueDate: '2024',
    expiryDate: {
      id: 'Berlaku 3 Tahun',
      en: 'Valid for 3 Years',
    },
    credentialId: 'LSP-POLINEMA-WEB-2024',
    credentialUrl: null,
    file: null,
    status: 'upcoming',
    badge: 'LSP',
    iconType: 'award',
    skills: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Web Security', 'Database Normalization'],
    description: {
      id: 'Sertifikasi uji kompetensi keahlian terakreditasi BNSP untuk perancangan aplikasi web modern, keamanan data, integrasi API, serta optimasi kueri basis data relasional.',
      en: 'BNSP-accredited competency assessment for modern web application development, data integrity, secure API integrations, and relational database query optimization.',
    },
  },
  {
    id: 'cert-toeic',
    category: 'language',
    issuer: {
      id: 'ETS (Educational Testing Service) / International Test Center',
      en: 'ETS (Educational Testing Service) / International Test Center',
    },
    title: {
      id: 'TOEIC® Official Score Report & Certificate of Achievement',
      en: 'TOEIC® Official Score Report & Certificate of Achievement',
    },
    scheme: {
      id: 'Test of English for International Communication (Listening & Reading)',
      en: 'Test of English for International Communication (Listening & Reading)',
    },
    issueDate: '2024',
    expiryDate: {
      id: 'Berlaku 2 Tahun',
      en: 'Valid for 2 Years',
    },
    credentialId: 'ETS-TOEIC-PLN-2024',
    credentialUrl: null,
    file: null,
    status: 'upcoming',
    badge: 'TOEIC',
    iconType: 'globe',
    skills: ['Professional Business English', 'Listening Comprehension', 'Reading Comprehension', 'Global Communication'],
    description: {
      id: 'Sertifikasi standar internasional untuk mengukur kemahiran berbahasa Inggris dalam konteks lingkungan kerja profesional, kolaborasi tim global, dan literatur teknologi.',
      en: 'Internationally recognized credential assessing English proficiency in professional workplace environments, global engineering collaboration, and technical communication.',
    },
  },
  {
    id: 'cert-dicoding-backend',
    category: 'course',
    issuer: {
      id: 'Dicoding Indonesia',
      en: 'Dicoding Indonesia (Google Developers Authorized Partner)',
    },
    title: {
      id: 'Belajar Fundamental Back-End & Arsitektur API Modern',
      en: 'Fundamental Back-End & Modern API Architecture',
    },
    scheme: {
      id: 'Learning Path: Back-End Developer Expert',
      en: 'Learning Path: Back-End Developer Expert',
    },
    issueDate: '2024',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'DICODING-BACKEND-EXPERT',
    credentialUrl: null,
    file: null,
    status: 'upcoming',
    badge: 'Dicoding',
    iconType: 'terminal',
    skills: ['Node.js / Express', 'RESTful API Design', 'Postman Automation', 'Clean Architecture', 'API Security'],
    description: {
      id: 'Pelatihan intensif pengembangan layanan backend berstandar industri dengan fokus pada arsitektur modular, validasi data otomatis, error handling terpusat, dan pengujian API menyeluruh.',
      en: 'Intensive industry-standard backend development course focusing on modular architectures, rigorous data validation, centralized error handling, and comprehensive API testing.',
    },
  },
  {
    id: 'cert-kominfo-dts',
    category: 'course',
    issuer: {
      id: 'Digital Talent Scholarship — Kementerian Kominfo RI',
      en: 'Digital Talent Scholarship — Ministry of ICT Indonesia',
    },
    title: {
      id: 'Pelatihan Professional Academy: Database & Web Development',
      en: 'Professional Academy: Database & Enterprise Web Development',
    },
    scheme: {
      id: 'Vocational School Graduate Academy (VSGA) / PROA Kominfo',
      en: 'Vocational School Graduate Academy (VSGA) / PROA Kominfo',
    },
    issueDate: '2024',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'KOMINFO-DTS-PROA-2024',
    credentialUrl: null,
    file: null,
    status: 'upcoming',
    badge: 'DTS Kominfo',
    iconType: 'database',
    skills: ['SQL Optimization', 'Enterprise Database Management', 'Laravel Ecosystem', 'Web Services'],
    description: {
      id: 'Program pelatihan nasional talenta digital Kementerian Komunikasi dan Informatika guna memperdalam penguasaan teknologi basis data, integrasi sistem enterprise, dan standar industri digital.',
      en: 'National digital talent initiative by the Ministry of Communications and Informatics to master enterprise database technologies, backend integrations, and digital industry standards.',
    },
  },
  {
    id: 'cert-hackerrank-sql',
    category: 'course',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Technical Assessment',
    },
    title: {
      id: 'SQL (Advanced) & Problem Solving Assessment',
      en: 'SQL (Advanced) & Problem Solving Assessment',
    },
    scheme: {
      id: 'HackerRank Verified Skill Certification',
      en: 'HackerRank Verified Skill Certification',
    },
    issueDate: '2024',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-SQL-ADV',
    credentialUrl: null,
    file: null,
    status: 'upcoming',
    badge: 'HackerRank',
    iconType: 'code',
    skills: ['Complex Joins', 'Window Functions', 'Query Optimization', 'Relational Algebra', 'Subqueries'],
    description: {
      id: 'Uji kemampuan teknis kueri tingkat lanjut, mencakup pemrosesan data kompleks, CTE, window analytical functions, serta optimasi performa kueri basis data berskala besar.',
      en: 'Advanced technical assessment covering complex SQL processing, analytical window functions, CTEs, and high-performance database query optimization.',
    },
  },
];
