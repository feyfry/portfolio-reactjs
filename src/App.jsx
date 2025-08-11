import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Common Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Navigation from './components/common/Navigation'
import ScrollToTop from './components/common/ScrollToTop'
import { FloatingSocialLinks } from './components/common/SocialLinks'

// Section Components
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

// UI Components
import SplashScreen from './components/ui/SplashScreen'

// Animation Components
import { FloatingParticles } from './components/animations/ParticleBackground'
import FadeIn from './components/animations/FadeIn'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAppReady, setIsAppReady] = useState(false)

  // Simplified loading - just show splash for 2 seconds
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setIsAppReady(true)
      }, 100)
    }, 2000) // 2 seconds instead of complex preload

    return () => clearTimeout(loadingTimer)
  }, [])

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setIsAppReady(true)
    }, 100)
  }

  return (
    <div className="App min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen
            key="splash"
            onComplete={handleSplashComplete}
            title="ポートフォリオ"
            subtitle="読み込み中..."
            englishTitle="Portfolio"
            englishSubtitle="Loading..."
            duration={2000}
            showProgress={true}
            particles={true}
            backgroundElements={true}
          />
        )}
      </AnimatePresence>

      {/* Main Application */}
      <AnimatePresence>
        {!isLoading && isAppReady && (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background Particles */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <FloatingParticles
                particleCount={30}
                speed={0.5}
                direction="random"
                particleColor="#a855f7"
                interactive={false}
                density="low"
                fadeEdges={true}
              />
            </div>

            {/* Navigation */}
            <Header />
            <Navigation />

            {/* Main Content */}
            <main className="relative z-10">
              <FadeIn direction="none" duration={0.8}>
                {/* Hero Section */}
                <Hero />

                {/* About Section */}
                <About />

                {/* Skills Section */}
                <Skills />

                {/* Projects Section */}
                <Projects />

                {/* Experience Section */}
                <Experience />

                {/* Contact Section */}
                <Contact />
              </FadeIn>
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Elements */}
            <FloatingSocialLinks />

            {/* Scroll to Top */}
            <ScrollToTop
              variant="progress"
              position="bottom-right"
              icon="rocket"
              showAt={300}
            />

            {/* Japanese Scroll to Top Alternative */}
            <ScrollToTop
              variant="japanese"
              position="bottom-left"
              showAt={500}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App