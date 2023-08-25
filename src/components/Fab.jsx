import React from "react";
import PropTypes from "prop-types";

/**
 * Um botão circular que recebe opcionalmente uma cor
 */

function Fab({ title, onClick, children, className, color, ...rest }) {
  let cls =
    "p-2  rounded-full shadow-lg hover:scale-105 transition active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed " +
    className;
  // Define a cor escolhida pelo usuário para o botão fab
  if (color) {
    cls = cls + ` bg-${color} `;
  }

  return (
    <button title={title} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}

Fab.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]),
};

export default Fab;
