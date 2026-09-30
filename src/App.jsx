import React from 'react'
import MainLayout from './components/mainlayout/MainLayout'
import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import Services from './sections/Services'
import Experience from './sections/Experience'

export default function App() {
  return (
    <MainLayout>
      <Hero />
      <TechStack />
      <Services />
      <Experience />
    </MainLayout>
  )
}
