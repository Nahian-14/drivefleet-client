export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } }
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } }
};

export const fadeUpItem = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: '0 4px 20px rgba(14,165,233,0.08)' },
  hover: {
    y: -8, scale: 1.02,
    boxShadow: '0 20px 56px rgba(14,165,233,0.18)',
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  }
};

export const modalVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};
