'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries';

interface NavbarProps {
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dict = getDictionary(lang);

  const menuItems = [
    { label: dict.menu.home, link: '/' },
    { label: dict.menu.cnc, link: `/${lang}/cnc` },
    { label: dict.menu.mask, link: `/${lang}/mask` },
    { label: dict.menu.glass, link: `/${lang}/glass` },
    { label: dict.menu.contact, link: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[var(--background)] shadow-lg' : 'bg-[var(--background)]'
        }`}
        style={{
          height: isScrolled ? '70px' : '90px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href={`/${lang}`} className="flex items-center">
              <motion.div
                className="relative"
                style={{
                  width: isScrolled ? '120px' : '160px',
                  height: isScrolled ? '37.5px' : '50px',
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-[var(--foreground)]/20">
                <Link
                  href="/pl"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    lang === 'pl'
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--foreground)] hover:text-[var(--accent)]'
                  }`}
                >
                  PL
                </Link>
                <span className="text-[var(--foreground)]/30">|</span>
                <Link
                  href="/en"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    lang === 'en'
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--foreground)] hover:text-[var(--accent)]'
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                  className="w-6 h-0.5 bg-[var(--foreground)] block absolute"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-[var(--foreground)] block absolute"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                  className="w-6 h-0.5 bg-[var(--foreground)] block absolute"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 h-[90px] bg-[var(--background)] z-40 md:hidden"
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-[var(--accent)] z-30 md:hidden flex flex-col items-center justify-center pt-[90px]"
            >
              <nav className="flex flex-col items-center space-y-8 mb-12">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className="text-[var(--foreground)] text-3xl font-bold hover:scale-110 transition-transform duration-200"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex items-center space-x-4"
              >
                <Link
                  href="/pl"
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold transition-colors duration-200 ${
                    lang === 'pl'
                      ? 'text-[var(--background)]'
                      : 'text-[var(--foreground)] hover:text-[var(--background)]'
                  }`}
                >
                  PL
                </Link>
                <span className="text-[var(--foreground)]/50 text-2xl">|</span>
                <Link
                  href="/en"
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold transition-colors duration-200 ${
                    lang === 'en'
                      ? 'text-[var(--background)]'
                      : 'text-[var(--foreground)] hover:text-[var(--background)]'
                  }`}
                >
                  EN
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}