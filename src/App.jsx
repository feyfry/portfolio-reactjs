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
import Loading from './components/ui/Loading'

// Animation Components
import { FloatingParticles } from './components/animations/ParticleBackground'
import FadeIn from './components/animations/FadeIn'

function App() {
  // All useState hooks at top level
  const [isLoading, setIsLoading] = useState(true)
  const [isAppReady, setIsAppReady] = useState(false)
  const [preloadComplete, setPreloadComplete] = useState(false)

  // Preload critical resources
  useEffect(() => {
    const preloadResources = async () => {
      try {
        // Preload critical images
        const criticalImages = [
          '/assets/images/profile/avatar.jpg',
          // Add other critical images here
        ]

        const imagePromises = criticalImages.map(src => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = () => resolve() // Don't fail on image errors
            img.src = src
          })
        })

        // Preload fonts
        const fontPromises = [
          document.fonts.load('400 16px Inter'),
          document.fonts.load('400 16px "Noto Sans JP"'),
          document.fonts.load('400 16px "JetBrains Mono"')
        ]

        // Wait for resources
        await Promise.allSettled([...imagePromises, ...fontPromises])

        // Minimum loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000))

        setPreloadComplete(true)
      } catch (error) {
        console.error('Preload error:', error)
        setPreloadComplete(true) // Continue even if preload fails
      }
    }

    preloadResources()
  }, [])

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setIsAppReady(true)
    }, 100)
  }

  // Show loading if preload not complete
  if (!preloadComplete) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loading
          variant="kanji"
          size="large"
          text="Initializing..."
          japanese="初期化中..."
        />
      </div>
    )
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
            duration={3000}
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