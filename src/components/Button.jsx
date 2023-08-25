import React from "react";
import PropTypes from "prop-types";
/**
 * Cria um botão para ser usado na aplicação. Botão com 3 tipos de escolha. contained, text, outlined
 */

const getClassName = (variant) => {
  const defaultClassName = " px-2 py-1 rounded-lg hover:shadow-lg transition ";
  switch (variant) {
    case "contained":
      return defaultClassName + " bg-primary text-white ";
    case "text":
      return defaultClassName + " text-primary ";
    case "outlined":
      return defaultClassName + " border border-primary text-primary ";
    default:
      return defaultClassName;
  }
};

function Button({ onClick, children, variant, className, ...rest }) {
  const classNameBtn = getClassName(variant) + className;
  return (
    <button onClick={onClick} className={classNameBtn} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "text", "outlined"]),
};

export default Button;
