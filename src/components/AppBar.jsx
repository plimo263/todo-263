import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import Menu from "./Menu";
import { MdMoreVert } from "react-icons/md";
/**
 * Barra superior do aplicativo
 *
 */
const STR = {
  altLogo: "Logo da Appbar",
  greeting: "Olá",
  labelBtnExit: "Sair do App",
};

function AppBar() {
  const [view, setView] = useState(false);
  const refBtn = useRef(null);
  const { data: session } = useSession();
  // Exibe o menu
  const onViewMenu = useCallback(() => {
    setView(true);
  }, [setView]);

  // Usado para ocultar o menu
  const onClose = useCallback(() => {
    setView(false);
  }, [setView]);
  //
  return (
    <div className="w-full p-1 flex flex-row shadow-lg bg-white">
      <div className="container mx-auto max-w-6xl flex flex-row items-center justify-between">
        <Image
          src="/assets/logo.png"
          height={48}
          width={68}
          alt={STR.altLogo}
        />
        {session && (
          <div className="flex items-center gap-2">
            <span>{STR.greeting} </span>
            <span className="pacifico text-sm">
              {session?.user?.name?.split(" ")[0]}
            </span>

            <Image
              className="rounded-full"
              width={48}
              height={48}
              src={session.user.image}
              alt={session.user.name}
            />
            <button onClick={onViewMenu} ref={refBtn}>
              <MdMoreVert size={24} className="text-primary" />
            </button>
            <Menu
              onClose={onClose}
              isOpen={view}
              anchorEl={refBtn}
              options={[<LogoutBtn key="btn" />]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
//
const LogoutBtn = () => {
  const onLogout = useCallback(async () => {
    await signOut();
  }, []);

  return (
    <Button className="hover:shadow-none" onClick={onLogout}>
      {STR.labelBtnExit}
    </Button>
  );
};

export default AppBar;
