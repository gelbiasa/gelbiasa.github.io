import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiTool } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.18, ease: 'easeOut' },
  }),
};

const experiences = [
  {
    company: 'PT Multi Spunindo Jaya Tbk',
    role: 'Intern — Full Stack Developer',
    period: 'July 2025 – December 2025',
    current: true,
    points: [
      'Designed and developed a Bill of Materials (BOM) data integration system to optimize production efficiency across Jumbo, Slitter, and Meltblown lines.',
      'Implemented business logic using Laravel and MSJ Framework (the company\'s proprietary in-house framework) to standardize application modules.',
      'Integrated SAP APIs to perform real-time automated validation on resource and material data, ensuring all selected data is registered in SAP and minimizing manual data entry risks.',
      'Authored system user manuals and other technical documentation to facilitate smooth deployment and end-user operations.',
    ],
    tools: ['Laravel', 'MSJ Framework', 'SAP API', 'MySQL', 'VsCode'],
  },
  {
    company: 'UPA TIK Politeknik Negeri Malang',
    role: 'Intern — Back-end Developer',
    period: 'February 2025 – June 2025',
    current: false,
    points: [
      'Designed the Physical Database Model (PDM) using MySQL Workbench for Information Systems, User Access Management, and Log Tables.',
      'Successfully implemented system database structures and schemas using MySQL.',
      'Created modular JavaScript templates for Summernote Editor integration, including secure image upload and deletion features.',
      'Developed reusable code components utilizing Laravel Traits to streamline common functions across models and controllers, such as soft deletes, user action logging, file handling, and response formatting.',
      'Designed and architected the official PPID (Information and Documentation Management Officer) Website.',
    ],
    tools: ['VsCode', 'MySQL Workbench', 'Summernote Editor', 'Bootstrap', 'Postman', 'Laravel'],
  },
];

export default function Experience() {
  return (
    <section className="relative pt-8 lg:pt-12 px-6 md:px-12 lg:px-20 xl:px-28 pb-20">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className="badge mb-4">Work Experience</span>
        <h2
          className="font-display font-bold text-3xl md:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          My Professional{' '}
          <span className="gradient-text">Journey</span>
        </h2>
        <p className="text-slate-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
          Hands-on experience building real-world systems in fast-paced industry environments.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="relative pl-16 md:pl-24"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] md:left-[26px] top-2 flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${exp.current ? 'border-accent bg-accent/20 shadow-[0_0_12px_rgba(84,229,166,0.5)]' : 'border-slate-600 bg-[#0f1117]'}`}>
                  <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-accent animate-pulse' : 'bg-slate-600'}`} />
                </div>
              </div>

              {/* Card */}
              <div className="glass border border-white/5 hover:border-accent/20 transition-all duration-300 p-6 md:p-8 rounded-2xl shadow-xl group">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Current
                      </span>
                    )}
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FiBriefcase size={13} className="text-accent flex-shrink-0" />
                      <span className="text-accent font-semibold text-sm">{exp.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono bg-white/4 border border-white/8 px-3 py-1.5 rounded-full flex-shrink-0">
                    <FiCalendar size={12} />
                    {exp.period}
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2.5 mb-5">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tools */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mr-1">
                    <FiTool size={12} />
                    <span className="font-semibold">Tools:</span>
                  </div>
                  {exp.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-[11px] font-medium bg-accent/8 border border-accent/15 text-accent/80 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
