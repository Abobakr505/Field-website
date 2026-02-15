import React, { useState, useCallback, memo } from 'react';
import { Mail, Home, Zap, User, Briefcase, Menu, X, BadgeCheck } from 'lucide-react';
import { ShimmerButton } from './ShimmerButton';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    currentView: string;
    onNavigate: (view: string) => void;
}

const FacebookIcon = memo(({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="256"
    height="256"
    viewBox="0 0 256 256"
    className={className}
  >
    <rect width="256" height="256" rx="60" fill="#1877F2" />
    <path
      fill="#fff"
      d="M157.2 133.3l4.4-28.7h-27.6V86c0-7.8 3.8-15.4 16.1-15.4h12.5V46.2s-11.3-1.9-22.1-1.9c-22.5 0-37.2 13.6-37.2 38.3v22h-25v28.7h25V212h30.7v-78.7h23.2z"
    />
  </svg>
));
FacebookIcon.displayName = "FacebookIcon";

const InstagramIcon = memo(({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" className={className}>
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="25%" stopColor="#fa7e1e" />
        <stop offset="50%" stopColor="#d62976" />
        <stop offset="75%" stopColor="#962fbf" />
        <stop offset="100%" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <g fill="none">
      <rect width="256" height="256" rx="60" fill="url(#instagramGradient)" />
      <path
        fill="#fff"
        d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.994-51.344-51.347-51.344Zm0 18.04c18.4 0 33.313 14.913 33.313 33.314c0 18.4-14.913 33.313-33.313 33.313c-18.4 0-33.313-14.913-33.313-33.313c0-18.4 14.913-33.314 33.313-33.314Z"
      />
    </g>
  </svg>
));

InstagramIcon.displayName = 'InstagramIcon';

const WhatsAppIcon = memo(({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="256"
    height="256"
    viewBox="0 0 256 256"
    className={className}
  >
    <rect width="256" height="256" rx="60" fill="#25D366" />
    <path
      fill="#fff"
      d="M128 48c-44.2 0-80 34.9-80 77.9c0 13.7 3.7 27.1 10.7 38.9L48 208l44.9-10.5c11.4 6.1 24.2 9.3 37.1 9.3c44.2 0 80-34.9 80-77.9S172.2 48 128 48m0 140.5c-11.1 0-21.9-3-31.3-8.6l-2.2-1.3l-26.7 6.2l6.1-25.9l-1.4-2.6c-6.4-11.1-9.8-23.7-9.8-36.4c0-39.4 33-71.5 73.3-71.5s73.3 32.1 73.3 71.5s-33 71.5-73.3 71.5m40.3-53.8c-.5-.8-1.8-1.3-3.7-2.1c-1.9-.8-11.1-5.4-12.8-6c-1.7-.6-3-.8-4.2.8c-1.2 1.6-4.8 6-5.9 7.2c-1.1 1.2-2.1 1.3-4 .4c-1.9-.8-8-2.9-15.2-9.4c-5.6-5-9.4-11.1-10.5-13c-1.1-1.9-.1-3 1-3.9c.9-.8 1.9-2.1 2.8-3.1c.9-1 1.2-1.7 1.8-2.9c.6-1.2.3-2.3-.2-3.1c-.5-.8-4.2-10-5.8-13.7c-1.5-3.6-3.1-3.1-4.2-3.1c-1.1 0-2.3-.1-3.6-.1s-3.1.5-4.7 2.3c-1.6 1.8-6.2 6-6.2 14.6c0 8.6 6.3 16.9 7.2 18.1c.9 1.2 12.4 19.4 30.2 26.4c4.2 1.7 7.5 2.7 10.1 3.5c4.2 1.3 8 1.1 11 .7c3.4-.5 11.1-4.5 12.7-8.9c1.6-4.4 1.6-8.2 1.1-8.9"
    />
  </svg>
));
WhatsAppIcon.displayName = "WhatsAppIcon";

const LinkedInIcon = memo(({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" className={className}><g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><rect width="256" height="256" fill="#0a66c2" rx="60"/><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"/></g></svg>
));
LinkedInIcon.displayName = 'LinkedInIcon';

const menuItems = [
    { name: 'Home', icon: Home },    
    { name: 'About', icon: User },
    { name: 'Skills', icon: Zap },
    { name: 'Works', icon: Briefcase },
     { name: 'Journey', icon: BadgeCheck  }

] as const;

const socialLinks = [
    { icon: FacebookIcon, href: "https://www.facebook.com/share/1EkT2V7A6w/?mibextid=wwXIfr", label: "Facebook" },
    { icon: InstagramIcon, href: "https://www.instagram.com/ahmedkhaledph?igsh=cGUyNzBnOWU1dW56", label: "Instagram" },
    { icon: WhatsAppIcon, href: "https://wa.me/+201090304760", label: "WhatsApp" },
    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/ahmed-khaled-07b32b274", label: "LinkedIn" },
] as const;

const Navbar: React.FC<NavbarProps> = memo(({ currentView, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleMobileMenuOpen = useCallback(() => setIsMobileMenuOpen(true), []);
    const handleMobileMenuClose = useCallback(() => setIsMobileMenuOpen(false), []);
    const handleContactToggle = useCallback(() => setIsContactOpen(prev => !prev), []);
    const handleHomeClick = useCallback(() => onNavigate('Home'), [onNavigate]);

    const handleMobileNavClick = useCallback((name: string) => {
        onNavigate(name);
        setIsMobileMenuOpen(false);
    }, [onNavigate]);

    return (
        <>
            <nav className="relative z-50 w-full max-w-[1600px] mx-auto px-4 py-3 md:px-6 md:py-6 flex justify-center items-center pointer-events-none select-none shrink-0">
                <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
                    <div className="flex items-center p-1.5 pl-3 md:pl-4 gap-3 bg-zinc-800/40 backdrop-blur-[32px] border border-zinc-700/40 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-full transition-all duration-500 hover:bg-zinc-800/50 transform-gpu ring-1 ring-white/[0.03]">
                        <div
                            className="pr-2 md:pr-3 flex items-center gap-2.5 group cursor-pointer border-r border-white/5"
                            onClick={handleHomeClick}
                        >
                            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
                                <img className="" src="/favicon.png" alt="" />
                            </div>
                            <span className="font-designer text-xl md:text-2xl tracking-tighter text-gray-100 hidden sm:block opacity-90 group-hover:opacity-100 transition-opacity">Ahmed </span>
                        </div>

                        <div className="hidden md:flex items-center gap-1">
                            {menuItems.map((item) => {
                                const isActive = currentView === item.name;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => onNavigate(item.name)}
                                        className={`
                                            relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 group/item
                                            ${isActive ? 'text-blue-100' : 'text-gray-400 hover:text-gray-200'}
                                        `}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-700/50 backdrop-blur-xl rounded-full z-0 border border-blue-800/60 shadow-[0_2px_14px_-3px_rgba(59,130,246,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(59,130,246,0.15)]"
                                                transition={{ type: "spring", bounce: 0.28, duration: 0.6 }}
                                            />
                                        )}
                                        <item.icon
                                            size={15}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={`relative z-10 transition-transform duration-300 ${isActive ? "text-blue-200 scale-110 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" : "opacity-70 group-hover/item:scale-105"}`}
                                        />
                                        <span className={`relative font-display z-10 tracking-tight transition-colors duration-300 ${isActive ? "text-blue-50 font-bold" : ""}`}>
                                            {item.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors border border-white/5 text-gray-200"
                            onClick={handleMobileMenuOpen}
                        >
                            <Menu size={18} />
                        </button>
                    </div>

                    <div className="relative group/contact">
                        <AnimatePresence>
                            {isContactOpen && (
                                <div className="absolute inset-0 font-display flex items-center justify-center pointer-events-none z-0">
                                    {socialLinks.map((social, index) => {
                                        const startAngle = 160;
                                        const step = 45;
                                        const angle = startAngle - (index * step);
                                        const rad = (angle * Math.PI) / 180;
                                        const radius = 90;

                                        const finalX = Math.cos(rad) * radius;
                                        const finalY = Math.sin(rad) * radius;

                                        return (
                                            <motion.a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                custom={index}
                                                className="absolute w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-xl border border-white/10 pointer-events-auto hover:bg-gray-900 hover:scale-110 transition-colors z-[-1]"
                                                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                                                animate={{
                                                    x: finalX,
                                                    y: finalY,
                                                    opacity: 1,
                                                    scale: 1,
                                                    transition: { type: "spring", stiffness: 180, damping: 15, delay: index * 0.05 }
                                                }}
                                                exit={{
                                                    x: 0,
                                                    y: 0,
                                                    opacity: 0,
                                                    scale: 0.5,
                                                    transition: { duration: 0.2, delay: (socialLinks.length - 1 - index) * 0.03 }
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <div className="w-6 h-6 flex items-center justify-center">
                                                    <social.icon className="w-full h-full" />
                                                </div>
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            )}
                        </AnimatePresence>

                        <div className="relative z-20 transform transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
                            <ShimmerButton
                                onClick={handleContactToggle}
                                className="shadow-[0_20px_48px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300 h-10 md:h-11 px-5 md:px-7"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-xs font-bold tracking-[0.05em] uppercase">
                                    <span className="hidden sm:inline font-display">
                                        {isContactOpen ? 'Close' : 'Contact Me'}
                                    </span>
                                    <span className="sm:hidden font-display">
                                        {isContactOpen ? 'Close' : 'Contact'}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isContactOpen ? 180 : 0, scale: isContactOpen ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {isContactOpen ? (
                                            <X size={14} className="text-white" />
                                        ) : (
                                            <Mail size={14} className="text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                                        )}
                                    </motion.div>
                                </span>
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-zinc-900/80 flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <button
                            className="absolute top-6 right-6 p-3 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
                            onClick={handleMobileMenuClose}
                        >
                            <X size={24} className="text-gray-100" />
                        </button>

                        <nav className="flex flex-col gap-8 text-center">
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    onClick={() => handleMobileNavClick(item.name)}
                                    className={`text-3xl font-display font-bold flex items-center justify-center gap-4 ${currentView === item.name ? 'text-[#fcdd00]' : 'text-gray-100'
                                        }`}
                                >
                                    <item.icon size={28} strokeWidth={currentView === item.name ? 3 : 2} />
                                    {item.name}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;