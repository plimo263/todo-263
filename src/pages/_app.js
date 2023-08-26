import AppBar from "@/components/AppBar";
import "@/styles/globals.css";
import "@fontsource/pacifico";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  return (
    <SessionProvider session={session}>
      {router?.route !== "/" && <AppBar />}
      <AnimatePresence>
        <motion.div
          key={router?.route}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="p-4 container mx-auto max-w-6xl"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </SessionProvider>
  );
}
