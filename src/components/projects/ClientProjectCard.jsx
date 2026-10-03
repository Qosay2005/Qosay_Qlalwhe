import ProjectCard from './ProjectCard'

export default function ClientProjectCard({ project }) {
  return <ProjectCard project={project} actionLabel="Live Demo" actionUrl={project.liveUrl} />
}
