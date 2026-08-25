/** Icon-only controls need translated aria-labels — these render the glyph only. */

export const YouTube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8zM9.8 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

export const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTok = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.8a4.8 4.8 0 0 1-1.1-3.1h-3.2v12.9a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.8a5.8 5.8 0 1 0 5 5.8V9.3a7.9 7.9 0 0 0 4.6 1.5V7.6a4.8 4.8 0 0 1-3.5-1.8z" />
  </svg>
);

export const Facebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
  </svg>
);

export const Play = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
    <path d="M13 8L0 16V0l13 8z" />
  </svg>
);

export const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const ArrowDown = () => (
  <svg width="14" height="30" viewBox="0 0 14 30" fill="none" aria-hidden="true">
    <path d="M7 0v26M2 21l5 5 5-5" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const Lock = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <rect x="1" y="6" width="10" height="7" rx="1" />
    <path d="M3.5 6V3.8a2.5 2.5 0 0 1 5 0V6" />
  </svg>
);

/* --- Timeline milestone icons --- */

export const Anchor = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 6.5V21M6 11H18M4 15a8 8 0 0 0 16 0" />
  </svg>
);

export const Tower = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M12 2v4M9.5 21c1-6 1.2-11 2.5-15 1.3 4 1.5 9 2.5 15M8 21h8M9 13h6M7.6 17h8.8" />
  </svg>
);

export const Star = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3z" />
  </svg>
);

export const Glass = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M5 4h14l-7 8v8M9 20h6M5 4l7 8" />
  </svg>
);

export const Book = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M3 4.5h6a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H3v-12zM21 4.5h-6a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H21v-12z" />
  </svg>
);

export const timelineIcons = [Anchor, Tower, Star, Glass, Book];
