import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { motion } from "framer-motion";
/**
 * Componente que exibe um modal que é uma caixa suspensa que ocupa toda a tela para exibição.
 */

const STR = {
  titleCloseModal: "Clique para fechar o modal",
  labelBtnClose: "Fechar",
};

function Modal({ children, onClose }) {
  return (
    <div className="z-50 fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-black opacity-80">
      <motion.div
        initial={{ y: "150vh" }}
        animate={{ y: "0" }}
        exit={{ y: "150vh" }}
        transition={{ type: "keyframes", delay: 0.1 }}
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
    </div>
  );
}

Modal.propTypes = {
  /** Pode ser texto, uma tag ou até mesmo um outro componente complexo para exibição. */
  children: PropTypes.any,
  /** Funcao de callback usada para ser invocada quando o botão Fechar do modal for clicado */
  onClose: PropTypes.func.isRequired,
};

export default Modal;
