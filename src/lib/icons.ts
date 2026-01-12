import {
  Atom,
  Code2,
  FileCode2,
  Palette,
  Move,
  Server,
  Database,
  PenTool,
  GitBranch,
  Container,
  Code,
  Cpu,
  Briefcase,
  GraduationCap,
  Layers,
  Layout,
  Cloud,
  Terminal,
  Settings,
  User,
} from 'lucide-react';

export const IconMap: { [key: string]: any } = {
  Atom,
  Code2,
  FileCode2,
  Palette,
  Move,
  Server,
  Database,
  PenTool,
  GitBranch,
  Container,
  Code,
  Cpu,
  Briefcase,
  GraduationCap,
  Layers,
  Layout,
  Cloud,
  Terminal,
  Settings,
  User,
};

export const getIcon = (iconName: string | null) => {
  if (!iconName) return Code;
  return IconMap[iconName] || Code;
};
