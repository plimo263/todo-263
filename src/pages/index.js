import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
/**
 *  Esta tela é somente uma splash screen para a aplicação
 */
function Index() {
  const router = useRouter();
  // Aplica um efeito para tornar a tela de login carregavel
  useEffect(() => {
    setTimeout(() => {
      router.push("/todo");
    }, [2000]);
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Image
        alt="Logo da aplicação"
        src="/assets/logo.png"
        width={200}
        height={200}
      />
    </div>
  );
}

export default Index;
