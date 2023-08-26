import React from "react";
import PropTypes from "prop-types";
import { clsx } from "clsx";
/**
 * Cria um botão para ser usado na aplicação. Botão com 3 tipos de escolha. contained, text, outlined
 */

function Button({ onClick, children, variant, className, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={clsx({
        "px-2 py-1 rounded-lg hover:shadow-lg transition": true,
        "bg-primary text-white": variant === "contained",
        "text-primary": variant === "text",
        "border border-primary text-primary": variant === "outlined",
        [className]: className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "text", "outlined"]),
};

export default Button;
