import { clsx } from "clsx";
import React from "react";
/**
 * Campo de entrada para textos, data, textarea entre outros. Todos os campos de um input são aceitos
 */

const classNames = {
  container:
    "text-2xl bg-transparent text-center outline-none border-b-4 transition border-secondary/30 focus:border-secondary placeholder:text-gray-400",
};

function TextField({ className, ...rest }) {
  return rest?.type === "textarea" ? (
    <textarea
      {...rest}
      className={clsx({
        [classNames.container]: true,
        [className]: Boolean(className),
      })}
    />
  ) : (
    <input
      {...rest}
      className={clsx({
        [classNames.container]: true,
        "pb-1": true,
        [className]: Boolean(className),
      })}
    />
  );
}

export default TextField;
