import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { getAnimationType } from "./Animations";
/**
 * Uma lista que recebe os itens a pode aplicar algum tipo de animação sobre os mesmos.
 * A lista de animações disponíveis é grande e você pode controlar o intervalo em que os
 * filhos são exibidos na tela.
 */

const classNames = {
  container: "space-y-2 mt-2",
};

function List({ items, renderItem, animation, interval, className }) {
  // Verifica qual variante foi escolhida
  const variant = getAnimationType(animation, interval);

  // Não deseja animacao ou ela não foi encontrada
  if (!variant) {
    return (
      <ul
        className={clsx({
          [classNames.container]: true,
          [className]: Boolean(className),
        })}
      >
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
      className={clsx({
        [classNames.container]: true,
        [className]: Boolean(className),
      })}
    >
      <AnimatePresence>
        {items.map((item, idx) => (
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
