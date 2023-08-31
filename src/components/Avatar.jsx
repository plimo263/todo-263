import React from "react";
/**
 * Exibe a imagem em formato de avatar com bordas totalmente circulares
 */

const classNames = {
  container: "w-12 h-12 rounded-full",
};

function Avatar({ alt, src }) {
  return (
    <img className={classNames.container} title={alt} src={src} alt={alt} />
  );
}

export default Avatar;
