/**
 * Data Sertifikasi, Lisensi & Pelatihan (Certifications, Credentials & Training)
 * 
 * Panduan Pengisian:
 * - category: 'national' (Nasional: LSP/BNSP/TOEIC) | 'general' (Umum/Internasional: HackerRank) | 'course' (Pelatihan: Dicoding/Komdigi)
 * - status: 'available' (jika file PDF/gambar sudah ada) | 'upcoming' (jika masih wadah/segera diunggah)
 * - file: path ke file di folder public, misal: '/file/sertifikat/nasional/TOEIC.pdf'
 * - credentialUrl: link verifikasi online resmi (jika ada)
 */

export const certificateCategories = [
  { id: 'all', labelKey: 'certificates.tabs.all' },
  { id: 'course', labelKey: 'certificates.tabs.course' },
  {
    id: 'cert-parent',
    labelKey: 'certificates.tabs.certParent',
    children: [
      { id: 'cert-all', labelKey: 'certificates.tabs.certAll' },
      { id: 'cert-national', labelKey: 'certificates.tabs.certNational' },
      { id: 'cert-general', labelKey: 'certificates.tabs.certGeneral' },
    ],
  },
];

export const certificatesData = [
  // =========================================================================
  // 1. STANDAR NASIONAL (LSP / TOEIC / BNSP)
  // =========================================================================
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
    category: 'national',
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
    credentialId: 'ETS-TOEIC-OFFICIAL',
    credentialUrl: null,
    file: '/file/sertifikat/nasional/TOEIC.pdf',
    status: 'available',
    badge: 'TOEIC',
    iconType: 'globe',
    skills: ['Professional Business English', 'Listening Comprehension', 'Reading Comprehension', 'Global Communication'],
    description: {
      id: 'Sertifikat resmi hasil uji kemahiran berbahasa Inggris TOEIC® (Listening & Reading) berstandar internasional untuk komunikasi profesional dan akademik.',
      en: 'Official TOEIC® (Listening & Reading) test score report and achievement certificate assessing English proficiency in professional workplace environments and global engineering communication.',
    },
  },

  // =========================================================================
  // 2. SERTIFIKASI UMUM & INTERNASIONAL (HACKERRANK)
  // =========================================================================
  {
    id: 'cert-hr-se',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'Software Engineer Role Certificate',
      en: 'Software Engineer Role Certificate',
    },
    scheme: {
      id: 'HackerRank Role Certification — Software Engineer',
      en: 'HackerRank Role Certification — Software Engineer',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-SE-ROLE',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/software_engineer.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'code',
    skills: ['Software Engineering', 'Problem Solving', 'Data Structures', 'Algorithms', 'SQL'],
    description: {
      id: 'Sertifikasi uji kompetensi peran Software Engineer dari HackerRank yang menguji penguasaan komprehensif dalam pemecahan masalah algoritma, optimasi struktur data, dan rekayasa perangkat lunak.',
      en: 'Comprehensive HackerRank Software Engineer role certification validating proficiency in advanced algorithmic problem solving, data structures, and software engineering principles.',
    },
  },
  {
    id: 'cert-hr-se-intern',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'Software Engineer Intern Role Certificate',
      en: 'Software Engineer Intern Role Certificate',
    },
    scheme: {
      id: 'HackerRank Role Certification — Software Engineer Intern',
      en: 'HackerRank Role Certification — Software Engineer Intern',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-SE-INTERN',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/software_engineer_intern.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'terminal',
    skills: ['Problem Solving', 'Data Structures', 'Algorithm Design', 'Software Engineering Fundamentals'],
    description: {
      id: 'Sertifikasi kompetensi HackerRank untuk peran Software Engineer Intern, membuktikan keahlian dalam perancangan algoritma, analisis kompleksitas kode, dan struktur data.',
      en: 'HackerRank Software Engineer Intern certification demonstrating problem-solving abilities, algorithm design, and core software development fundamentals.',
    },
  },
  {
    id: 'cert-hr-sql-adv',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'SQL (Advanced) Certificate',
      en: 'SQL (Advanced) Certificate',
    },
    scheme: {
      id: 'HackerRank Skill Assessment — SQL (Advanced)',
      en: 'HackerRank Skill Assessment — SQL (Advanced)',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-SQL-ADV',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/sql_advanced.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'database',
    skills: ['Complex Joins', 'Window Functions', 'Query Optimization', 'Relational Algebra', 'Subqueries'],
    description: {
      id: 'Uji kompetensi kueri basis data tingkat mahir HackerRank, meliputi optimasi kueri kompleks, CTE, analytical window functions, dan manipulasi data relasional berskala besar.',
      en: 'Advanced SQL skill assessment by HackerRank validating expertise in complex queries, analytical window functions, query performance optimization, and relational modeling.',
    },
  },
  {
    id: 'cert-hr-sql-int',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'SQL (Intermediate) Certificate',
      en: 'SQL (Intermediate) Certificate',
    },
    scheme: {
      id: 'HackerRank Skill Assessment — SQL (Intermediate)',
      en: 'HackerRank Skill Assessment — SQL (Intermediate)',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-SQL-INT',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/sql_intermediate.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'database',
    skills: ['Intermediate SQL', 'Joins & Unions', 'Aggregations', 'Database Management', 'Group By'],
    description: {
      id: 'Sertifikasi keahlian kueri SQL tingkat menengah HackerRank, mencakup joins, grouping, fungsi agregasi, subqueries, dan filtering data relasional.',
      en: 'Intermediate SQL certification validating mastery in multi-table joins, complex aggregations, grouping conditions, and relational database queries.',
    },
  },
  {
    id: 'cert-hr-ps-int',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'Problem Solving (Intermediate) Certificate',
      en: 'Problem Solving (Intermediate) Certificate',
    },
    scheme: {
      id: 'HackerRank Skill Assessment — Problem Solving (Intermediate)',
      en: 'HackerRank Skill Assessment — Problem Solving (Intermediate)',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-PS-INT',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/problem_solving_intermediate.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'code',
    skills: ['Data Structures', 'Algorithms', 'Time & Space Complexity', 'Problem Solving', 'Optimization'],
    description: {
      id: 'Sertifikasi kemampuan pemecahan masalah komputasi tingkat menengah HackerRank dengan algoritma teroptimasi dan pemanfaatan struktur data yang tepat.',
      en: 'Intermediate Problem Solving certification covering data structures, algorithmic paradigms, time-space complexity optimization, and mathematical logic.',
    },
  },
  {
    id: 'cert-hr-rest-int',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'Rest API (Intermediate) Certificate',
      en: 'Rest API (Intermediate) Certificate',
    },
    scheme: {
      id: 'HackerRank Skill Assessment — Rest API (Intermediate)',
      en: 'HackerRank Skill Assessment — Rest API (Intermediate)',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-REST-INT',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/rest_api_intermediate.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'terminal',
    skills: ['RESTful API', 'HTTP Methods', 'Pagination & Filtering', 'API Integration', 'JSON Processing'],
    description: {
      id: 'Sertifikasi teknis HackerRank dalam perancangan dan konsumsi RESTful API, penanganan respon HTTP, autentikasi, serta pemrosesan data berbasis pagination dan sorting.',
      en: 'Technical HackerRank certification validating expertise in designing and consuming REST APIs, HTTP methods, pagination handling, and JSON response structuring.',
    },
  },
  {
    id: 'cert-hr-js-int',
    category: 'general',
    issuer: {
      id: 'HackerRank',
      en: 'HackerRank Assessment',
    },
    title: {
      id: 'JavaScript (Intermediate) Certificate',
      en: 'JavaScript (Intermediate) Certificate',
    },
    scheme: {
      id: 'HackerRank Skill Assessment — JavaScript (Intermediate)',
      en: 'HackerRank Skill Assessment — JavaScript (Intermediate)',
    },
    issueDate: '02 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: 'HACKERRANK-JS-INT',
    credentialUrl: 'https://www.hackerrank.com/certificates',
    file: '/file/sertifikat/hackerrank/javascript_intermediate.pdf',
    status: 'available',
    badge: 'HackerRank',
    iconType: 'code',
    skills: ['JavaScript ES6+', 'Asynchronous JS', 'Promises & Async/Await', 'Event Loop', 'Design Patterns'],
    description: {
      id: 'Sertifikasi kemampuan pemrograman JavaScript tingkat menengah HackerRank, mencakup konsep asinkron, closures, prototypic inheritance, dan manipulasi data modern.',
      en: 'Intermediate JavaScript certification testing deep understanding of async paradigms, promises, closures, prototype chaining, and modern ES6+ features.',
    },
  },

  // =========================================================================
  // 3. PELATIHAN & KURSUS (DICODING, KOMDIGI DIGITALENT)
  // =========================================================================
  {
    id: 'cert-dicoding-solid',
    category: 'course',
    issuer: {
      id: 'Dicoding Indonesia',
      en: 'Dicoding Indonesia (Google Developers Authorized Partner)',
    },
    title: {
      id: 'Belajar Prinsip Pemrograman SOLID',
      en: 'Learn SOLID Programming Principles',
    },
    scheme: {
      id: 'Kelas Sertifikasi: Software Design Principles & Object-Oriented Programming (OOP)',
      en: 'Certification Course: Software Design Principles & Object-Oriented Programming (OOP)',
    },
    issueDate: '03 Nov 2026',
    expiryDate: {
      id: 'Berlaku hingga 03 November 2029 (3 Tahun)',
      en: 'Valid until 03 November 2029 (3 Years)',
    },
    credentialId: '81P2K4WNQXOY',
    credentialUrl: 'https://dicoding.com/certificates/81P2K4WNQXOY',
    file: '/file/sertifikat/pelatihan/sertifikat_dicoding_prinsip_pemrograman.pdf',
    status: 'available',
    badge: 'Dicoding',
    iconType: 'terminal',
    skills: ['SOLID Principles', 'Object-Oriented Programming', 'Clean Code', 'Design Patterns', 'Software Architecture'],
    description: {
      id: 'Sertifikasi kelulusan resmi Dicoding Indonesia dalam penerapan arsitektur OOP berstandar industri dan penguasaan 5 pilar SOLID: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, dan Dependency Inversion.',
      en: 'Official graduation certificate from Dicoding Indonesia mastering industry-standard OOP architecture and the 5 SOLID pillars: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.',
    },
  },
  {
    id: 'cert-digitalent-intermediate',
    category: 'course',
    issuer: {
      id: 'Digital Talent Scholarship — Kementerian Komdigi RI',
      en: 'Digital Talent Scholarship — Ministry of Communication & Digital RI',
    },
    title: {
      id: 'Intermediate Assistant Web Developer',
      en: 'Intermediate Assistant Web Developer',
    },
    scheme: {
      id: 'Nasional Digital Talent Academy (DTA) DTS 2026 — Pusat Pengembangan Talenta Digital',
      en: 'National Digital Talent Academy (DTA) DTS 2026 — Center for Digital Talent Development',
    },
    issueDate: '03 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: '21211989840-2959/DTA/BLSDM.Komdigi/2026',
    credentialUrl: 'https://digitalent.komdigi.go.id/',
    file: '/file/sertifikat/pelatihan/sertifikat_digitalent_intermediate_web_developer.pdf',
    status: 'available',
    badge: 'Komdigi DTA',
    iconType: 'code',
    skills: ['Pemrograman Terstruktur', 'Coding Best Practices', 'Reusable Libraries', 'Web Development'],
    description: {
      id: 'Sertifikasi pelatihan tingkat menengah Kementerian Komunikasi dan Digital RI (Komdigi) mencakup penulisan kode sesuai guidelines dan best practice industri, pemrograman terstruktur, serta pemanfaatan komponen/library pre-existing.',
      en: 'Intermediate level training certification by the Ministry of Communication and Digital Affairs (Komdigi) covering industry guideline coding best practices, structured programming, and reusable library integration.',
    },
  },
  {
    id: 'cert-digitalent-fundamental',
    category: 'course',
    issuer: {
      id: 'Digital Talent Scholarship — Kementerian Komdigi RI',
      en: 'Digital Talent Scholarship — Ministry of Communication & Digital RI',
    },
    title: {
      id: 'Fundamental of Assistant Web Developer',
      en: 'Fundamental of Assistant Web Developer',
    },
    scheme: {
      id: 'Nasional Digital Talent Academy (DTA) DTS 2026 — Pusat Pengembangan Talenta Digital',
      en: 'National Digital Talent Academy (DTA) DTS 2026 — Center for Digital Talent Development',
    },
    issueDate: '03 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: '21211988840-10925/DTA/BLSDM.Komdigi/2026',
    credentialUrl: 'https://digitalent.komdigi.go.id/',
    file: '/file/sertifikat/pelatihan/sertifikat_digitalent_fundamental_web_developer.pdf',
    status: 'available',
    badge: 'Komdigi DTA',
    iconType: 'terminal',
    skills: ['UI Implementation', 'Multimedia Programming', 'Modular Code Organization', 'Web Foundations'],
    description: {
      id: 'Sertifikasi pelatihan fundamental dari Kementerian Komunikasi dan Digital RI (Komdigi) meliputi perancangan dan implementasi antarmuka pengguna (UI), eksekusi bahasa pemrograman multimedia, serta penyusunan fungsi dan modul terorganisir.',
      en: 'Fundamental training certification by the Ministry of Communication and Digital Affairs (Komdigi) covering UI implementation, multimedia code execution, and organized modular code structuring.',
    },
  },
  {
    id: 'cert-digitalent-microskill',
    category: 'course',
    issuer: {
      id: 'Digital Talent Scholarship — Kementerian Komdigi RI',
      en: 'Digital Talent Scholarship — Ministry of Communication & Digital RI',
    },
    title: {
      id: 'Konsep Pemrograman Micro Skill',
      en: 'Micro Skill Programming Concepts',
    },
    scheme: {
      id: 'Pelatihan Micro Skill DTS 2026 — Pusat Pengembangan Literasi Digital',
      en: 'Micro Skill Training DTS 2026 — Center for Digital Literacy Development',
    },
    issueDate: '03 Nov 2026',
    expiryDate: {
      id: 'Seumur Hidup',
      en: 'Lifetime Validity',
    },
    credentialId: '2299793850-15750/MS/BLSDM.Komdigi/2026',
    credentialUrl: 'https://digitalent.komdigi.go.id/',
    file: '/file/sertifikat/pelatihan/sertifikat_digitalent_konsep_pemrograman.pdf',
    status: 'available',
    badge: 'Komdigi DTS',
    iconType: 'database',
    skills: ['Konsep Pemrograman', 'Logic & Algorithm', 'Problem Solving', 'Digital Literacy'],
    description: {
      id: 'Pelatihan resmi Kementerian Komunikasi dan Digital RI guna memperkuat pemahaman fundamental logika algoritma, alur komputasi, dan konsep dasar rekayasa pemrograman komputer.',
      en: 'Official training certificate by the Ministry of Communication and Digital Affairs strengthening core algorithm logic, computational flow, and foundational software programming concepts.',
    },
  },
];
