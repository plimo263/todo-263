import React from "react";
/**
 * Conhecido como botão do icone, sua função é receber o icone e criar todo um efeito em volta do icone com atividade sobre o clique
 */

function IconButton({ children, onClick, ...res }) {
  return (
    <button
      {...res}
      onClick={onClick}
      className="rounded-full p-1 outline-none hover:bg-gray-200 hover:scale-110 transition active:bg-gray-300"
    >
      {children}
    </button>
  );
}

export default IconButton;
