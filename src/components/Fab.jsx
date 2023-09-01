import React from "react";
import PropTypes from "prop-types";
import { clsx } from "clsx";

/**
 * Um botão circular que recebe opcionalmente uma cor
 */

const classNames = {
  container:
    "p-2 rounded-full shadow-lg hover:scale-105 transition active:scale-95 disabled:bg-gray-100 dark:disabled:bg-slate-900 ring-2 disabled:text-gray-400 disabled:cursor-not-allowed",
  primary: "bg-primary ring-primary",
  secondary: "ring-secondary bg-secondary",
};

function Fab({ title, onClick, children, className, color, ...rest }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx({
        [classNames.container]: true,
        [classNames.primary]: color === "primary",
        [classNames.secondary]: color === "secondary",
        [className]: className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

Fab.propTypes = {
  /** Determina uma das cores a serem aplicadas as tarefas */
  color: PropTypes.oneOf(["primary", "secondary"]),
  /** Funcao para acionar o click */
  onClick: PropTypes.func.isRequired,
  /** Classe a ser aplicada ao componente Fab */
  className: PropTypes.string,
  /** Titulo para o botão quando o mouse seguir proximo */
  title: PropTypes.string,
};

export default Fab;
