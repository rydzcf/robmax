"use client"
import { getDictionary } from '@/dictionaries';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ContentImageProps {
  lang: string;
  imagePosition?: 'left' | 'right';
  imageSrc: string;
  imageAlt: string;
  sectionKey: string;
}

export default function ContentImage({
  lang,
  imagePosition = 'right',
  imageSrc,
  imageAlt,
  sectionKey,
}: ContentImageProps) {
  const dict = getDictionary(lang) as any;
  const section = dict[sectionKey];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: imagePosition === 'right' ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: imagePosition === 'right' ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const buttonVariants: Variants = {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-[var(--background)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <motion.div
            variants={textVariants}
            className={imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6"
            >
              {section.title}
            </motion.h2>
            
            <motion.div variants={itemVariants}>
              <p className="text-lg text-[var(--foreground)]/80 mb-8 leading-relaxed whitespace-pre-line">
                {section.description}
              </p>
            </motion.div>

            {section.buttonText && section.buttonLink && (
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href={section.buttonLink}
                    className="inline-block px-8 py-4 bg-[var(--accent)] text-[var(--foreground)] font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {section.buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            className={`relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl ${
              imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}