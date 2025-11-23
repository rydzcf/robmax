'use client';

import { getDictionary } from '@/dictionaries';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface Mask {
  id: number;
  modele: string[];
  h: string;
  w: string;
  w_elem: string;
  fi: string;
  image: string;
  typ?: string;
}

export default function CardList({data, lang} : {data : Mask[], lang: string}) {

  const dict = getDictionary(lang)

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
        delay: index * 0.1,
      },
    }),
  };

  const imageVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
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
                src={item.image || '/placeholder.jpg'}
                alt={`Maskownica typ ${item.typ || item.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col ">
            <h4 className="font-bold text-[var(--foreground)] mb-2">
              ID: {item.id}
            </h4>

            {item.typ && (
              <p className="text-[var(--foreground)]/90 mb-4 font-medium">
                 {`${dict.mask.typ} : ${item.typ}`}
              </p>
            )}

            <div className="space-y-1 text-[var(--foreground)]/80 mb-4">
              <p>
                <strong>{`${dict.mask.wysokość}:  `}</strong> {item.h}
              </p>
              <p>
                <strong>{`${dict.mask.szerokość}:  `}</strong> {item.w}
              </p>
              <p>
                <strong>{`${dict.mask.elem_wypukly}:  `}</strong> {item.w_elem}
              </p>
              <p>
                <strong>{`${dict.mask.otwor}:  `}</strong> {item.fi}
              </p>
            </div>

            {/* Modele */}
            {item.modele && item.modele.length > 0 && (
              <div className="mt-auto">
                <h6 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  {`${dict.mask.pasuje_do}: `}
                </h6>
                <ul className="list-disc list-inside text-[var(--foreground)]/80 space-y-1">
                  {item.modele.map((model) => (
                    <li key={model} className='marker:text-[var(--accent)]'>{model}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}