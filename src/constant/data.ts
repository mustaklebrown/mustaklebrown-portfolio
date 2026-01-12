export interface Section {
  id: string;
  label: string;
  checked: boolean;
}

// export interface Project {
//   title: string;
//   desc: string;
// }

export interface Service {
  title: string;
  desc: string;
  icon: string;
}

export const sections: Section[] = [
  { id: 'home', label: 'Home', checked: true },
  { id: 'about', label: 'About', checked: false },
  { id: 'work', label: 'Work', checked: true },
  { id: 'contact', label: 'Contact', checked: false },
  { id: 'blog', label: 'Blog', checked: true },
];

export const services: Service[] = [
  {
    title: 'Premium Web Development',
    desc: 'Crafting high-performance, responsive websites with a focus on clean code and modern aesthetics',
    icon: 'Code',
  },
  {
    title: 'UI/UX Design Systems',
    desc: 'Building scalable design systems and intuitive user interfaces that deliver exceptional user experiences',
    icon: 'Palette',
  },
  {
    title: 'Custom SaaS Solutions',
    desc: 'Developing robust full-stack applications and automated platforms tailored to your business needs',
    icon: 'Rocket',
  },
  {
    title: 'Visual Storytelling',
    desc: 'Bringing brands to life through immersive animations, dynamic interactions, and creative front-end engineering',
    icon: 'Sparkles',
  },
];
