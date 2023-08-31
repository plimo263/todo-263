import React from "react";
import PropTypes from "prop-types";
import { clsx } from "clsx";
/**
 * Cria um botão para ser usado na aplicação. Botão com 3 tipos de escolha. contained, text, outlined
 */

const classNames = {
  container: "px-2 py-1 rounded-lg hover:shadow-lg transition",
  variantContained: "bg-primary text-white",
  variantText: "text-primary",
  variantOutlined: "border border-primary text-primary",
};

function Button({ onClick, children, variant, className, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={clsx({
        [classNames.container]: true,
        [classNames.variantContained]: variant === "contained",
        [classNames.variantText]: variant === "text",
        [classNames.variantOutlined]: variant === "outlined",
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
