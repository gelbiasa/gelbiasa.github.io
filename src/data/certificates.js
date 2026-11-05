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
      id: 'LSP P1 Politeknik Negeri Malang (Terlisensi BNSP)',
      en: 'LSP P1 Politeknik Negeri Malang (BNSP Licensed)',
    },
    title: {
      id: 'Sertifikasi Kompetensi: Pemrograman Software Komputer',
      en: 'Competency Certification: Computer Software Programming',
    },
    scheme: {
      id: 'Skema Sertifikasi: Pemrograman Software Komputer (SKKTI022017)',
      en: 'Certification Scheme: Computer Software Programming (SKKTI022017)',
    },
    issueDate: '2024',
    expiryDate: {
      id: 'Rekomendasi Asesmen: KOMPETEN (Sertifikat Fisik Dalam Proses)',
      en: 'Assessment Recommendation: COMPETENT (Physical Certificate In Process)',
    },
    credentialId: 'SKKTI022017 / FR.AK.02',
    credentialUrl: 'https://ujian.lsp.polinema.ac.id/sertifikasi/proses_sertifikasi/3ce6d3c8830d27ec2e6a1936ecbaa514',
    file: '/file/sertifikat/nasional/LSP_Polinema.pdf',
    status: 'available',
    badge: 'LSP P1',
    iconType: 'award',
    skills: ['OOP', 'SQL & Database', 'Struktur Data', 'Debugging', 'Algoritma Pemrograman', 'UI Implementation', 'Spesifikasi Program'],
    description: {
      id: 'Bukti resmi rekaman asesmen kompetensi (FR.AK.02) dari LSP P1 Polinema dengan rekomendasi akhir KOMPETEN untuk 12 unit kompetensi keahlian software development standar SKKNI.',
      en: 'Official competency assessment record (FR.AK.02) by LSP P1 Polinema with final recommendation of COMPETENT across 12 SKKNI-standard software development competency units.',
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
