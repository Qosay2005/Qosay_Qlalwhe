// Training and learning projects.
// Add project screenshots and GitHub URLs before publishing.
import ecommerce from '../assets/images/projects/training/ecommerce.jpg'
import todoapp from '../assets/images/projects/training/todoapp.jpg'
export const trainingProjects = [
  {
    id: 'ecommerce-final-project',
    title: 'E-Commerce Web Application',

    description:
      'A full-featured e-commerce application integrated with a real backend API, featuring authentication, shopping cart, protected routes, and Arabic/English support.',

    image: ecommerce,
    imageAlt: 'E-commerce web application',

    technologies: [
      'React',
      'Material UI',
      'TanStack Query',
      'Zustand',
      'Axios',
    ],

    githubUrl: 'https://github.com/Qosay2005/e_commerce.git',
  },

  {
    id: 'jenin-supermarket',
    title: 'Jenin Supermarket',

    description:
      'An academic supermarket management system focused on database design, data management, and backend integration using Node.js and SQL.',

    image: '',
    imageAlt: 'Jenin Supermarket management system',

    technologies: [
      'Node.js',
      'Express.js',
      'MySQL',
      'JavaScript',
    ],

    githubUrl: 'https://github.com/Qosay2005/jenin_super_market.git',
  },

  {
    id: 'todo-list-app',
    title: 'To-Do List App',

    description:
      'An interactive task management application for organizing daily tasks, featuring a chatbot to improve user interaction and usability.',

    image: todoapp,
    imageAlt: 'To-Do List task management application',

    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Tailwind CSS',
    ],

    githubUrl: 'https://github.com/Qosay2005/to_do_list.git',
  },
]