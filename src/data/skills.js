import {
  FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLaravel, FaFigma, FaReact, FaGithub, FaTools
} from 'react-icons/fa'
import { SiMysql, SiFlutter, SiTailwindcss, SiNotion, SiMongodb, SiPostgresql } from 'react-icons/si'
import { FiCpu, FiCode, FiGrid } from 'react-icons/fi'

export const skills = [
  // Languages & Stack
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
    id: 'js',
    name: 'JavaScript',
    Icon: FaJs,
    color: '#F7DF1E',
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
    id: 'laravel',
    name: 'Laravel',
    Icon: FaLaravel,
    color: '#FF2D20',
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
    id: 'tailwind',
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    color: '#06B6D4',
    category: 'language-stack',
    type: 'main',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    Icon: SiFlutter,
    color: '#02569B',
    category: 'language-stack',
    type: 'additional',
  },

  // Tools
  {
    id: 'figma',
    name: 'Figma',
    Icon: FaFigma,
    color: '#F24E1E',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'notion',
    name: 'Notion',
    Icon: SiNotion,
    color: '#FFFFFF',
    category: 'tools',
    type: 'main',
  },
  {
    id: 'github',
    name: 'GitHub / CI-CD',
    Icon: FaGithub,
    color: '#FFFFFF',
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
