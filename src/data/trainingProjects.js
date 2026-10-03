// Temporary demo data for UI development.
// Replace with real project information before publishing.
// TODO: Replace every example.com URL and demo image before publishing.
// Imported local images can be used directly in the image field.

import taskManagement from '../assets/images/projects/training/task-management.svg'
import weatherDashboard from '../assets/images/projects/training/weather-dashboard.svg'
import ecommercePractice from '../assets/images/projects/training/ecommerce-practice.svg'

export const trainingProjects = [
  {
    id: 'task-management',
    title: 'Task Management App',
    description: 'A practice app concept for organizing tasks, tracking progress, and exploring reusable React components.',
    image: taskManagement,
    imageAlt: '', // Decorative demo illustration; add meaningful alt text for real screenshots.
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    githubUrl: 'https://example.com',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A practice dashboard concept for exploring API requests, forecast layouts, and responsive interfaces.',
    image: weatherDashboard,
    imageAlt: '', // Decorative demo illustration; add meaningful alt text for real screenshots.
    technologies: ['JavaScript', 'REST API', 'CSS'],
    githubUrl: 'https://example.com',
  },
  {
    id: 'ecommerce-practice',
    title: 'E-Commerce Practice App',
    description: 'A practice storefront concept for product browsing, cart interactions, and asynchronous data handling.',
    image: ecommercePractice,
    imageAlt: '', // Decorative demo illustration; add meaningful alt text for real screenshots.
    technologies: ['React', 'JavaScript', 'React Query'],
    githubUrl: 'https://example.com',
  },
]
