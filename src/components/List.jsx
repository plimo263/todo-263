import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
/**
 * Uma lista que recebe os itens a pode aplicar algum tipo de animação sobre os mesmos.
 * A lista de animações disponíveis é grande e você pode controlar o intervalo em que os
 * filhos são exibidos na tela.
 */

const getAnimationType = (animationType, interval = 0.2) => {
  const transition = {
    staggerChildren: interval,
    staggerDirection: 1,
    type: "keyframes",
  };
  const transitionExit = {
    duration: 0.3,
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

function List({ items, renderItem, animation, interval, className }) {
  const cls = "space-y-2 mt-2";
  // Verifica qual variante foi escolhida
  const variant = getAnimationType(animation, interval);

  // Não deseja animacao ou ela não foi encontrada
  if (!variant) {
    return (
      <ul className={clsx({ [cls]: true, [className]: Boolean(className) })}>
        {items.map((item, idx) => (
          <li key={idx}>{renderItem(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      variants={variant}
      initial="initial"
      animate="animate"
      className={clsx({ [cls]: true, [className]: Boolean(className) })}
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.li
            key={item.id || idx}
            variants={variant}
            exit={variant.exit}
          >
            {renderItem(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
//
List.propTypes = {
  /** Um array que será iterado para exibir os itens na lista */
  items: PropTypes.array.isRequired,
  /** Um callback que vai receber as props dos items passados por parametro e deverá retornar um Node React */
  renderItem: PropTypes.func.isRequired,
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
  /** Define um intervalo entre as animações dos filhos */
  interval: PropTypes.number,
  /** Uma classname a ser aplicada a lista dos itens */
};

export default List;
