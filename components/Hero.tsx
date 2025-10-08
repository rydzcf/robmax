'use client';

import { getDictionary } from '@/dictionaries';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  lang: string;
  };

export default function Hero({ lang }: HeroProps) {
  const dict = getDictionary(lang);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const buttons = [
    { label: dict.menu.glass, link: `/${lang}/glass` },
    { label: dict.menu.cnc, link: `/${lang}/cnc` },
    { label: dict.menu.mask, link: `/${lang}/mask` },
  ];

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Company Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        >
          Robmax
        </motion.h1>

        {/* Slogan */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {dict.hero.slogan}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {buttons.map((button, index) => (
            <motion.div
              key={index}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={button.link}
                className="inline-block px-8 py-4 bg-[var(--accent)] text-[var(--foreground)] font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[200px]"
              >
                {button.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}