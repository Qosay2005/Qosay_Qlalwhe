import React from 'react'
import MainLayout from './components/mainlayout/MainLayout'
import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import Services from './sections/Services'
import Experience from './sections/Experience'
import Recognition from './sections/Recognition'
import Projects from './sections/Projects'

export default function App() {
  return (
    <MainLayout>
      <Hero />
      <TechStack />
      <Services />
      <Experience />
      <Recognition />
      <Projects />
    </MainLayout>
  )
}
