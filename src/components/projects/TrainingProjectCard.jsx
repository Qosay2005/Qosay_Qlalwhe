import ProjectCard from './ProjectCard'

export default function TrainingProjectCard({ project }) {
  return <ProjectCard project={project} actionLabel="View GitHub" actionUrl={project.githubUrl} />
}
