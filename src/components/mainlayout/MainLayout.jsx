import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import QAIChat from '../chatbot/QAIChat'
import {Outlet} from 'react-router-dom'
export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children || <Outlet />}</main>
      <Footer />
      <QAIChat />
    </div>
  )
}
