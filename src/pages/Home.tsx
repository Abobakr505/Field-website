import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import About from '../components/About';
import Works from '../components/Works';
import { AuroraBackground } from '../components/AuroraBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import Journey from '../components/Journey';

const pageTransition = { duration: 0.4 };

const Home: React.FC = () => {
  // تحديد الصفحة الافتراضية بناءً على URL hash عند التحميل
  const [currentView, setCurrentView] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const validViews = ['Home', 'About', 'Skills', 'Works', 'Journey'];
    return hash && validViews.includes(hash) ? hash : 'Home';
  });

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view);
    window.location.hash = view; // تحديث الـ hash في الرابط
  }, []);

  // الاستماع لتغييرات الـ hash (مثل زر الرجوع/التقدم في المتصفح)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['Home', 'About', 'Skills', 'Works', 'Journey'];
      if (hash && validViews.includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('Home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // تنظيف الـ listener عند إلغاء الـ component
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const containerClass = useMemo(
    () =>
      cn(
        'flex-1 w-full relative overflow-x-hidden scrollbar-hide',
        currentView === 'Home' ? 'overflow-y-auto lg:overflow-hidden' : 'overflow-y-auto'
      ),
    [currentView]
  );

  return (
    <AuroraBackground className="flex flex-col overflow-hidden h-screen w-screen">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <div className={containerClass}>
        <AnimatePresence mode="wait">
          {currentView === 'Home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={pageTransition}
              className="h-full w-full min-h-[600px] md:min-h-0 gpu-accelerated"
            >
              <Hero onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentView === 'About' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={pageTransition}
              className="h-full w-full gpu-accelerated"
            >
              <About />
            </motion.div>
          )}

          {currentView === 'Skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={pageTransition}
              className="h-full w-full gpu-accelerated"
            >
              <Skills />
            </motion.div>
          )}

          {currentView === 'Works' && (
            <motion.div
              key="works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={pageTransition}
              className="h-full w-full gpu-accelerated"
            >
              <Works />
            </motion.div>
          )}

          {currentView === 'Journey' && (
            <motion.div
              key="Journey"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={pageTransition}
              className="h-full w-full gpu-accelerated"
            >
              <Journey />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {currentView === 'Home' && (
        <div className="fixed bottom-0 left-0 w-full h-12 md:h-24 bg-gradient-to-t from-[#F3F5FA] to-transparent pointer-events-none z-40" />
      )}
    </AuroraBackground>
  );
};

export default Home;