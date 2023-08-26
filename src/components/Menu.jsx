import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useClickAway } from "react-use";
/**
 * Exibe um menu com as opções informadas no options. Recebe um parametro de ancora para se agregar
 * ao componente clicado.
 */

function Menu({ onClose, anchorEl, options, isOpen }) {
  const ref = useRef(null);
  // Quando clicado fora fecha o componente de menu
  useClickAway(anchorEl, () => {
    if (isOpen) {
      setTimeout(() => onClose(), [300]);
    }
  });
  return (
    <div
      ref={ref}
      className="bg-slate-100 shadow-md p-2 w-auto rounded-md z-50 "
      style={{
        position: "fixed",
        top: anchorEl?.current?.offsetTop + 28,
        left: anchorEl?.current?.offsetLeft - ref?.current?.clientWidth + 16,
        visibility: isOpen ? "visible" : "hidden",
      }}
    >
      {options.map((item, idx) => (
        <div
          key={idx}
          className="cursor-pointer px-2 py-1 whitespace-nowrap hover:bg-slate-200 z-50 "
        >
          {item}
        </div>
      ))}
    </div>
  );
}

Menu.propTypes = {
  /** Uma função utilizada para fechar o menu quando o clique for em qualquer parte do menu ou fora */
  onClose: PropTypes.func.isRequired,
  /** Uma referencia (criada com useRef) usada para ancorar o menu ao seu invocador (um botão por exemplo) */
  anchorEl: PropTypes.any.isRequired,
  /** Um array com qualquer coisa que possa ser usada para representar os itens quando o menu é clicado */
  options: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** Um boleano que determina se o menu esta aberto ou não */
  isOpen: PropTypes.bool.isRequired,
};

export default Menu;
