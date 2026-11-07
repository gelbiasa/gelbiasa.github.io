import {
  FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLaravel, FaFigma, FaReact, FaGithub, FaTools
} from 'react-icons/fa'
import {
  SiMysql, SiFlutter, SiTailwindcss, SiNotion, SiMongodb, SiPostgresql, SiDbeaver,
  SiNodedotjs, SiDiagramsdotnet, SiPostman, SiBootstrap, SiVite, SiGitlab
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { FiCpu, FiCode, FiGrid } from 'react-icons/fi'

export const skills = [
  // =========================================================================
  // 1. Languages & Stack
  // =========================================================================
  {
    id: 'laravel',
    name: 'Laravel',
    Icon: FaLaravel,
    color: '#FF2D20',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'php',
    name: 'PHP',
    Icon: FaPhp,
    color: '#777BB4',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'js',
    name: 'JavaScript',
    Icon: FaJs,
    color: '#F7DF1E',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    Icon: SiNodedotjs,
    color: '#5FA04E',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    Icon: SiMysql,
    color: '#4479A1',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    Icon: SiPostgresql,
    color: '#336791',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    Icon: SiMongodb,
    color: '#47A248',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'html',
    name: 'HTML5',
    Icon: FaHtml5,
    color: '#E34F26',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'css',
    name: 'CSS3',
    Icon: FaCss3Alt,
    color: '#1572B6',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    color: '#06B6D4',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    Icon: SiBootstrap,
    color: '#7952B3',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'vite',
    name: 'Vite',
    Icon: SiVite,
    color: '#646CFF',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'react',
    name: 'React.js',
    Icon: FaReact,
    color: '#61DAFB',
    category: 'language-stack',
    type: 'additional',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    Icon: SiFlutter,
    color: '#02569B',
    category: 'language-stack',
    type: 'additional',
  },

  // =========================================================================
  // 2. Tools & Development Environment
  // =========================================================================
  {
    id: 'figma',
    name: 'Figma',
    Icon: FaFigma,
    color: '#F24E1E',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'mysql-workbench',
    name: 'MySQL Workbench',
    Icon: SiMysql,
    color: '#00758F',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'drawio',
    name: 'Draw.io',
    Icon: SiDiagramsdotnet,
    color: '#F08705',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    Icon: VscVscode,
    color: '#007ACC',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'postman',
    name: 'Postman',
    Icon: SiPostman,
    color: '#FF6C37',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'dbeaver',
    name: 'DBeaver',
    Icon: SiDbeaver,
    color: '#382923',
    colorDark: '#D2A98B',
    colorLight: '#382923',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'mongodb-compass',
    name: 'MongoDB Compass',
    Icon: SiMongodb,
    color: '#47A248',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'github',
    name: 'GitHub / CI-CD',
    Icon: FaGithub,
    color: '#FFFFFF',
    colorDark: '#FFFFFF',
    colorLight: '#1F2328',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    Icon: SiGitlab,
    color: '#FC6D26',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'notion',
    name: 'Notion',
    Icon: SiNotion,
    color: '#FFFFFF',
    colorDark: '#FFFFFF',
    colorLight: '#1F2328',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'ai-tools',
    name: 'AI Coding',
    Icon: FiCpu,
    color: '#A855F7',
    category: 'tools',
    type: 'main',
  },
]

export const skillCategories = [
  { key: 'all', label: 'All Skills', icon: FiGrid },
  { key: 'language-stack', label: 'Language & Stack', icon: FiCode },
  { key: 'tools', label: 'Tools', icon: FaTools },
]
