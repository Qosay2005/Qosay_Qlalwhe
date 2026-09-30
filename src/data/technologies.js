const icon = (name) => new URL(`../assets/icons/tech/${name}.svg`, import.meta.url).href

export const technologies = [
  { name: 'HTML', icon: icon('html'), category: 'Frontend' },
  { name: 'CSS', icon: icon('css'), category: 'Frontend' },
  { name: 'JavaScript', icon: icon('javascript'), category: 'Language' },
  { name: 'TypeScript', icon: icon('typescript'), category: 'Language' },
  { name: 'React', icon: icon('react'), category: 'Frontend' },
  { name: 'React Query', icon: icon('react-query'), category: 'Data Fetching' },
  { name: 'Tailwind CSS', icon: icon('tailwind'), category: 'Styling', wide: true },
  { name: 'Material UI', icon: icon('mui'), category: 'UI Library' },
  { name: 'Vite', icon: icon('vite'), category: 'Build Tool' },
  { name: 'npm', icon: icon('npm'), category: 'Package Manager', wide: true },
  { name: 'Git', icon: icon('git'), category: 'Version Control' },
  { name: 'GitHub', icon: icon('github'), category: 'Version Control' },
  { name: 'Postman', icon: icon('postman'), category: 'API Tool' },
  { name: 'SQL', icon: icon('sql'), category: 'Database' },
  { name: 'C++', icon: icon('cpp'), category: 'Language' },
  { name: 'Java', icon: icon('java'), category: 'Language' },
  { name: 'Figma', icon: icon('figma'), category: 'Design' },
  { name: 'Canva', icon: icon('canva'), category: 'Design' },
  { name: 'Notion', icon: icon('notion'), category: 'Productivity' },
  { name: 'Excel', icon: icon('excel'), category: 'Productivity' },
]
