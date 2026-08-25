'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import type { Dictionary } from '@/i18n/getDictionary';
import { trapTabKey } from '@/lib/focus';
import Reveal from './Reveal';

const archiveImages = [
  { src: '/images/archive-young.jpg', width: 715, height: 1000, className: 'author__archive--young' },
  { src: '/images/archive-id.jpg', width: 746, height: 1000, className: 'author__archive--id' },
  { src: '/images/archive-sofa.png', width: 528, height: 560, className: 'author__archive--sofa' },
  { src: '/images/archive-studio.png', width: 400, height: 400, className: 'author__archive--studio' },
] as const;

export default function ArchiveGallery({ dict }: { dict: Dictionary }) {
  const copy = dict.pages.author;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => index === null ? null : (index - 1 + archiveImages.length) % archiveImages.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => index === null ? null : (index + 1) % archiveImages.length);
      }
      trapTabKey(event, dialogRef.current);
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      openerRef.current?.focus();
    };
  }, [activeIndex]);

  const active = activeIndex === null ? null : archiveImages[activeIndex];
  const activeCaption = activeIndex === null ? '' : copy.archiveCaptions[activeIndex];

  return (
    <>
      <div className="author__archive-grid">
        {archiveImages.map((image, index) => {
          const caption = copy.archiveCaptions[index];
          return (
            <Reveal key={image.src} delayIndex={index}>
              <button
                type="button"
                className="archive-card"
                aria-label={copy.archiveOpen.replace('{caption}', caption)}
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
              >
                <span className={`author__archive ${image.className}`}>
                  <Image
                    src={image.src}
                    alt={caption}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 599px) 46vw, 280px"
                  />
                  <span className="archive-card__view t-label" aria-hidden="true">＋</span>
                </span>
                <span className="archive-card__caption">{caption}</span>
              </button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
      {active && activeIndex !== null ? (
        <m.div
          key="archive-lightbox"
          className="modal archive-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="archive-modal-caption"
          tabIndex={-1}
          ref={dialogRef}
          onClick={() => setActiveIndex(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <m.figure
            className="archive-modal__figure"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: 4 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="archive-modal__image">
              <Image
                src={active.src}
                alt={activeCaption}
                fill
                sizes="92vw"
                priority
              />
            </div>
            <figcaption id="archive-modal-caption">{activeCaption}</figcaption>
          </m.figure>

          <button
            type="button"
            className="archive-modal__nav archive-modal__nav--previous"
            aria-label={copy.archivePrevious}
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((activeIndex - 1 + archiveImages.length) % archiveImages.length);
            }}
          >←</button>
          <button
            type="button"
            className="archive-modal__nav archive-modal__nav--next"
            aria-label={copy.archiveNext}
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((activeIndex + 1) % archiveImages.length);
            }}
          >→</button>
          <button
            type="button"
            className="modal__close t-label"
            aria-label={copy.archiveClose}
            onClick={() => setActiveIndex(null)}
          >✕</button>
        </m.div>
      ) : null}
      </AnimatePresence>
    </>
  );
}
