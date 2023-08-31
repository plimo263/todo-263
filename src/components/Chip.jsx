import React from "react";
import PropTypes from "prop-types";
import { clsx } from "clsx";

const getColorAndVariant = (color, variant) => {
  if (variant === "filled") {
    return `bg-${color} text-white`;
  } else {
    return `border border-${color} ring-${color} text-${color}`;
  }
};

function Chip({ icon, label, color, variant, onClick, ...res }) {
  const cls = clsx({
    [`hover:bg-${color}/10 transition`]: variant !== "filled",
    [getColorAndVariant(color, variant)]: true,
    "px-2 py-1 rounded-full": true,
    "flex items-center gap-1": true,
    "cursor-pointer": Boolean(onClick),
  });

  return (
    <button onClick={onClick} className={cls} {...res}>
      {icon && icon}
      {label}
    </button>
  );
}
//
Chip.propTypes = {
  /** Um rotulo para exibir no componente chip */
  label: PropTypes.string.isRequired,
  /** Um nó react que represente um icone */
  icon: PropTypes.node,
  /** Uma cor para o chip */
  color: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  /** Determina como o chip deve ser exibido */
  variant: PropTypes.oneOf(["filled", "outlined"]).isRequired,
  /** Uma funcao de callback para quando o chip for clicado */
  onClick: PropTypes.func,
};

export default Chip;
