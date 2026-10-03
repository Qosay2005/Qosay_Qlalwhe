// Temporary demo data for UI development.
// Replace with real project information before publishing.
// TODO: Replace every example.com URL and demo image before publishing.
// Imported local images can be used directly in the image field.

import restaurantMenu from '../assets/images/projects/clients/restaurant-menu.svg'
import weddingServices from '../assets/images/projects/clients/wedding-services.svg'
import businessDashboard from '../assets/images/projects/clients/business-dashboard.svg'

export const clientProjects = [
  {
    id: 'restaurant-menu',
    title: 'Restaurant Digital Menu',
    description: 'A sample digital menu layout with clear categories, readable dishes, and a responsive browsing experience.',
    image: restaurantMenu,
    imageAlt: '', // Decorative demo illustration; add meaningful alt text for real screenshots.
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
  },
  {
    id: 'wedding-services',
    title: 'Wedding Services Website',
    description: 'A sample services website showcasing packages, event inspiration, and a simple path to enquiries.',
    image: weddingServices,
    imageAlt: '', // Decorative demo illustration; add meaningful alt text for real screenshots.
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
  },
  {
    id: 'business-dashboard',
    title: 'Business Dashboard',
    description: 'A sample dashboard concept for organizing business metrics, reports, and daily activity.',
    image: businessDashboard,
    imageAlt: '', // Decorative demo illustration; add meaningful alt text for real screenshots.
    technologies: ['React', 'React Query', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
  },
]
