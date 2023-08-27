import { clsx } from "clsx";
import React from "react";
/**
 * Campo de entrada para textos, data, textarea entre outros. Todos os campos de um input são aceitos
 */
function TextField({ className, ...rest }) {
  return rest?.type === "textarea" ? (
    <textarea
      {...rest}
      className={clsx({
        "pacifico text-2xl": true,
        "bg-transparent text-center": true,
        "outline-none border-b-4 border-secondary": true,
        "placeholder:text-gray-400": true,
        [className]: Boolean(className),
      })}
    />
  ) : (
    <input
      {...rest}
      className={clsx({
        "pacifico text-2xl": true,
        "bg-transparent text-center": true,
        "outline-none border-b-4 border-secondary": true,
        "pb-1 placeholder:text-gray-400": true,
        [className]: Boolean(className),
      })}
    />
  );
}

export default TextField;
