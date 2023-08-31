import React from "react";
/**
 * Conhecido como botão do icone, sua função é receber o icone e criar todo um efeito em volta do icone com atividade sobre o clique
 */

const classNames = {
  container:
    "rounded-full p-1 outline-none hover:bg-gray-200 hover:scale-110 transition active:bg-gray-300",
};

function IconButton({ children, onClick, ...res }) {
  return (
    <button onClick={onClick} className={classNames.container} {...res}>
      {children}
    </button>
  );
}

export default IconButton;
