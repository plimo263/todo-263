"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Button from "./Button";
import { MdDarkMode, MdLight, MdSunny } from "react-icons/md";

const classNames = {
  container: "border border-gray-300",
  innerButton: "flex items-center gap-2",
  textBtn: "text-xl",
};
const sizeIcon = 24;

export const ThemeSwitcher = () => {
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={classNames.container}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className={classNames.innerButton}>
        {theme === "light" ? (
          <MdSunny size={sizeIcon} />
        ) : (
          <MdDarkMode size={sizeIcon} />
        )}
        <span className={classNames.textBtn}>
          {theme === "light" ? "Claro" : "Escuro"}
        </span>
      </div>
    </Button>
  );
};
