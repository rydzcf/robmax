'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
  buttonText?: string;
  index?: number;
}

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  buttonText,
  index = 0,
}: CardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
        delay: index * 0.1,
      },
    },
  };

  const imageVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
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

  const CardContent = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[var(--background)] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          variants={imageVariants}
          whileHover="hover"
          className="w-full h-full"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          {title}
        </h3>
        <p className="text-[var(--foreground)]/80 mb-6 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Button */}
        {buttonText && link && (
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href={link}
              className="inline-block px-6 py-3 bg-[var(--accent)] text-[var(--foreground)] font-bold rounded-full hover:shadow-lg transition-shadow duration-300 text-center"
            >
              {buttonText}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return CardContent;
}