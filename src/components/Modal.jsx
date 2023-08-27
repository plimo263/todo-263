import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
/**
 * Componente que exibe um modal que é uma caixa suspensa que ocupa toda a tela para exibição.
 */

const STR = {
  titleCloseModal: "Clique para fechar o modal",
  labelBtnClose: "Fechar",
};

function Modal({ children, onClose, isOpen }) {
  return (
    <div
      className={clsx({
        transition: true,
        "fixed top-0 left-0 flex flex-col": true,
        "items-center justify-center": true,
        "w-screen h-screen": true,
        "-z-50 bg-transparent": !isOpen,
        "z-50 bg-black/80": isOpen,
      })}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="body-modal"
            initial={{ y: "150vh" }}
            animate={{ y: "0" }}
            exit={{ y: "150vh", transition: { duration: 0.1 } }}
            transition={{ type: "keyframes" }}
            className="bg-white w-11/12 md:w-10/12 lg:w-6/12 min-h-[50%] mx-auto p-4 rounded-lg flex flex-col justify-between "
          >
            {children}
            <Button
              title={STR.titleCloseModal}
              onClick={onClose}
              variant="outlined"
              className="self-end text-secondary border-secondary"
            >
              {STR.labelBtnClose}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Modal.propTypes = {
  /** Determina se o modal esta em primeiro plano na tela ou não */
  isOpen: PropTypes.bool.isRequired,
  /** Pode ser texto, uma tag ou até mesmo um outro componente complexo para exibição. */
  children: PropTypes.any,
  /** Funcao de callback usada para ser invocada quando o botão Fechar do modal for clicado */
  onClose: PropTypes.func.isRequired,
};

export default Modal;
