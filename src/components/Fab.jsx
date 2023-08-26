import React from "react";
import PropTypes from "prop-types";
import { clsx } from "clsx";

/**
 * Um botão circular que recebe opcionalmente uma cor
 */

function Fab({ title, onClick, children, className, color, ...rest }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx({
        "p-2 rounded-full shadow-lg": true,
        "hover:scale-105 transition active:scale-95": true,
        "disabled:bg-gray-100 ring-2 disabled:text-gray-400": true,
        "disabled:cursor-not-allowed": true,
        "ring-primary": color === "primary",
        "ring-secondary": color === "secondary",
        "bg-primary": color === "primary",
        "bg-secondary": color === "secondary",
        [className]: className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

Fab.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]),
};

export default Fab;
