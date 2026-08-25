'use client';

// `react-m` exposes only the lightweight `m` factory. The actual animation
// features are supplied once by MotionProvider, keeping the shared bundle
// smaller than importing the full Motion component runtime on every page.
import * as m from 'motion/react-m';
import type { ReactNode } from 'react';

/**
 * Editorial fade-and-rise on scroll. Siblings stagger by 80ms, capped at 4
 * so a long grid never feels slow. MotionConfig handles reduced motion.
 */
export default function Reveal({
  children,
  delayIndex = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  delayIndex?: number;
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
}) {
  const tags = { div: m.div, section: m.section, article: m.article, li: m.li };
  const MotionTag = tags[Tag] as typeof m.div;

  return (
    <MotionTag
      className={`reveal ${className}`.trim()}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.62, delay: Math.min(delayIndex, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
