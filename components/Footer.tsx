'use client';

import { getDictionary } from '@/dictionaries';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
const dict = getDictionary(lang);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <footer className="bg-[var(--accent)] text-[var(--foreground)] pt-16 pb-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <Link href={`/${lang}`} className="mb-6">
              <div className="relative w-[130px] h-[50px]">
                <Image
                  src="/logo-b.svg"
                  alt="Robmax Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              {dict.footer.slogan}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">{dict.footer.address}</h3>
            <address className="not-italic text-sm space-y-2 opacity-90" id="contact">
              <p>Straszków 115</p>
              <p>62-604 Straszków</p>
              <p className="pt-2">pon-pt: 8:00 - 16:00</p>
            </address>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">{dict.footer.contact}</h3>
            <div className="text-sm space-y-3 opacity-90">
              <p>
                <span className="block mb-1 opacity-70">{dict.footer.phone}:</span>
                <a
                  href="tel:+48781555777"
                  className="hover:text-[var(--background)] transition-colors duration-200"
                >
                  781 555 777
                </a>
              </p>
              <p>
                <span className="block mb-1 opacity-70">Email:</span>
                <a
                  href="mailto:info@robmax.pl"
                  className="hover:text-[var(--background)] transition-colors duration-200"
                >
                  info@robmax.pl
                </a>
              </p>
              <div className="pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 hover:text-[var(--background)] transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-[var(--foreground)]/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm opacity-70">
            © {currentYear} Robmax. {dict.footer.rights}
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <Link
              href="/pl"
              className={`transition-colors duration-200 ${
                lang === 'pl'
                  ? 'text-[var(--background)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              PL
            </Link>
            <span className="opacity-50">|</span>
            <Link
              href="/en"
              className={`transition-colors duration-200 ${
                lang === 'en'
                  ? 'text-[var(--background)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              EN
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}