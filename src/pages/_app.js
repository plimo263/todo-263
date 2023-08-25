import AppBar from "@/components/AppBar";
import "@/styles/globals.css";
import "@fontsource/pacifico";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {router.route !== "/" && <AppBar />}
      <div className="p-4 container mx-auto max-w-6xl">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
