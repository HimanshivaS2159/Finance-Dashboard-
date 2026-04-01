/**
 * Animation presets and variants for Framer Motion
 * Consistent animation patterns across the app
 */

// Fade in animation
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up animation
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Scale animation
export const scale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Slide from right
export const slideRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

// Slide from left
export const slideLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

// Stagger container
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Spring animation config
export const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Bounce animation config
export const bounce = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

// Card hover effect
export const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

// Button tap effect
export const buttonTap = {
  scale: 0.95,
};

// Modal animation
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 },
};

// Backdrop animation
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Number counter animation
export const countUp = (value) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  key: value, // Re-animate when value changes
});

// Pulse animation for notifications
export const pulse = {
  scale: [1, 1.1, 1],
  transition: { duration: 0.5, repeat: Infinity },
};

// Rotate animation
export const rotate = {
  rotate: 360,
  transition: { duration: 2, repeat: Infinity, ease: 'linear' },
};
