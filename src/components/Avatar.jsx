import Image from "next/image";
import React from "react";
/**
 * Exibe a imagem em formato de avatar com bordas totalmente circulares
 */
function Avatar({ alt, src }) {
  return (
    <Image
      className="w-12 h-12 rounded-full "
      title={alt}
      src={src}
      alt={alt}
    />
  );
}

export default Avatar;
