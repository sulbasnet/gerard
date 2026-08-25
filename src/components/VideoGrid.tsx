'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { featuredVideos } from '@/content/videos';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { trapTabKey } from '@/lib/focus';
import { Play } from './Icons';

/**
 * The YouTube iframe is created only when someone clicks. Nothing from
 * youtube.com loads on page view — a speed win, and a GDPR one, since no
 * third-party cookie is set before the visitor asks for the video.
 */
export default function VideoGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openId) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
      trapTabKey(e, dialogRef.current);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      // Return focus to the thumbnail that opened the modal
      openerRef.current?.focus();
    };
  }, [openId]);

  return (
    <>
      <div className="videos__grid">
        {featuredVideos.map((video) => {
          const title = video.title[locale];
          return (
            <button
              key={video.youtubeId}
              className="video-card"
              aria-label={dict.videos.play.replace('{title}', title)}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpenId(video.youtubeId);
              }}
            >
              <span className="video-card__thumb">
                <img
                  src={video.thumb ?? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt=""
                  width={480}
                  height={360}
                  loading="lazy"
                  decoding="async"
                />
                <span className="video-card__play" aria-hidden="true">
                  <span><Play /></span>
                </span>
              </span>
              <span className="video-card__title">{title}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
      {openId && (
        <m.div
          key={openId}
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={dict.videos.title}
          tabIndex={-1}
          ref={dialogRef}
          onClick={() => setOpenId(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <m.div
            className="modal__frame"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: 4 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${openId}?autoplay=1&rel=0`}
              title={dict.videos.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </m.div>
          <button
            className="modal__close t-label"
            aria-label={dict.videos.close}
            onClick={() => setOpenId(null)}
          >
            ✕
          </button>
        </m.div>
      )}
      </AnimatePresence>
    </>
  );
}
