import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ErrorBoundary from './components/ErrorBoundary'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

function RouteCleanup() {
  const location = useLocation()

  // This effect runs on every location change
  useLayoutEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0)

    // Cleanup function runs BEFORE next location change (before unmounting old route)
    return () => {
      // Kill all ScrollTriggers and revert DOM changes BEFORE React unmounts
      const triggers = ScrollTrigger.getAll()
      if (triggers && triggers.length > 0) {
        triggers.forEach(trigger => {
          try {
            trigger.kill(true, true) // Kill immediately and revert
          } catch (e) {
            // Silently catch any errors during cleanup
          }
        })
      }

      // Kill all GSAP tweens
      try {
        gsap.killTweensOf('*')
      } catch (e) {
        // Silently catch any errors
      }
    }
  }, [location.pathname])

  return null
}

function App() {

  return (
    <Router>
      <RouteCleanup />
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  )
}

export default App
