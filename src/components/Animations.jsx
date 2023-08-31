import PropTypes from "prop-types";
import { motion } from "framer-motion";
// Lista com efeitos disponveis
export const getAnimationType = (
  animationType,
  interval = 0.2,
  duration = 0.3
) => {
  const transition = {
    staggerChildren: interval,
    staggerDirection: 1,
    type: "keyframes",
    duration: duration || null,
  };
  const transitionExit = {
    duration: duration,
  };
  //
  switch (animationType) {
    case "collapse":
      return {
        initial: {
          height: "0",
        },
        animate: {
          height: "auto",
          transition: transition,
        },
        exit: {
          height: "0",
          transition: transitionExit,
        },
      };
    case "slide-left":
      return {
        initial: {
          x: "-100vw",
        },
        animate: {
          x: "0",
          transition: transition,
        },
        exit: {
          x: "-100vw",
          transition: transitionExit,
        },
      };
    case "slide-up":
      return {
        initial: {
          y: "-100vh",
        },
        animate: {
          y: "0",
          transition: transition,
        },
        exit: {
          y: "-100vh",
          transition: transitionExit,
        },
      };
    case "slide-down":
      return {
        initial: {
          y: "200vh",
        },
        animate: {
          y: "0",
          transition: transition,
        },
        exit: {
          y: "200vh",
          transition: transitionExit,
        },
      };
    case "slide-right":
      return {
        initial: {
          x: "200vw",
        },
        animate: {
          x: "0",
          transition: transition,
        },
        exit: {
          x: "200vw",
          transition: transitionExit,
        },
      };
    case "grow":
      return {
        initial: {
          scale: 0,
        },
        animate: {
          scale: 1,
          transition: transition,
        },
        exit: {
          x: 0,
          transition: transitionExit,
        },
      };
    case "fade":
      return {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: transition,
        },
        exit: {
          opacity: 0,
          transition: transitionExit,
        },
      };
    default:
      return null;
  }
};

// Componente de animações
export const Animate = ({ children, animation, duration }) => {
  return (
    <motion.span
      variants={getAnimationType(animation, 0.2, duration)}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.span>
  );
};
Animate.propTypes = {
  /** Define a animação que vai ser utilizada nos items da list a medida que eles vão carregando */
  animation: PropTypes.oneOf([
    "slide-left",
    "slide-top",
    "slide-right",
    "slide-down",
    "fade",
    "grow",
    "collapse",
    "none",
  ]),
  /** Define o tempo em que a transição será executada */
  duration: PropTypes.number,
};
