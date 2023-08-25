import React from "react";
/**
 * Campo de entrada para textos, data, textarea entre outros. Todos os campos de um input são aceitos
 */
function TextField({ ...rest }) {
  return (
    <input
      {...rest}
      className="pacifico text-2xl bg-transparent text-center outline-none border-b-4 border-secondary pb-1 placeholder:text-gray-400 "
    />
  );
}

export default TextField;
