import {
  FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLaravel, FaFigma, FaReact, FaGithub
} from 'react-icons/fa'
import { SiMysql, SiFlutter, SiTailwindcss } from 'react-icons/si'
import { FiCpu } from 'react-icons/fi'

export const skills = [
  // Core Engineering
  {
    id: 'laravel',
    name: 'Laravel',
    Icon: FaLaravel,
    color: '#FF2D20',
    category: 'core',
    level: 'Advanced',
  },
  {
    id: 'php',
    name: 'PHP',
    Icon: FaPhp,
    color: '#777BB4',
    category: 'core',
    level: 'Advanced',
  },
  {
    id: 'react',
    name: 'React.js',
    Icon: FaReact,
    color: '#61DAFB',
    category: 'core',
    level: 'Intermediate',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    Icon: SiMysql,
    color: '#4479A1',
    category: 'core',
    level: 'Advanced',
  },
  
  // UI/UX & Mobile
  {
    id: 'figma',
    name: 'Figma',
    Icon: FaFigma,
    color: '#F24E1E',
    category: 'uiux',
    level: 'Advanced',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    Icon: SiFlutter,
    color: '#02569B',
    category: 'uiux',
    level: 'Intermediate',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    color: '#06B6D4',
    category: 'uiux',
    level: 'Advanced',
  },

  // Modern Workflow
  {
    id: 'ai-tools',
    name: 'AI Coding (Cursor/Copilot)',
    Icon: FiCpu,
    color: '#A855F7',
    category: 'workflow',
    level: 'Advanced',
  },
  {
    id: 'github',
    name: 'GitHub / CI-CD',
    Icon: FaGithub,
    color: '#FFFFFF',
    category: 'workflow',
    level: 'Intermediate',
  },
]

export const skillCategories = [
  { key: 'all', label: 'All Skills' },
  { key: 'core', label: 'Core Engineering' },
  { key: 'uiux', label: 'UI/UX & Mobile' },
  { key: 'workflow', label: 'Modern Workflow' },
]
