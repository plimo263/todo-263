import Button from "@/components/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
/**
 * Area de login, os principais providers ficam aqui para o usuário se autenticar.
 */

const STR = {
  title: "To-do 263",
  phrase:
    "Crie tarefas e pequenas atividades do seu dia a dia com esta ferramenta. Para começar a utilizar faça login.",
  labelBtnGoogle: "Acessar com o Gmail",
};

function Todo() {
  return (
    <div>
      <main className="container mx-auto">
        <h1 className="text-center text-4xl pacifico mb-4">{STR.title}</h1>
        <p className="text-center">{STR.phrase}</p>

        <div className="mt-4 flex justify-center">
          <Button
            onClick={signIn}
            variant="outlined"
            className="w-full md:w-auto bg-slate-100 border-none shadow-md"
          >
            <div className="flex justify-center items-center gap-2">
              <Image
                src="/assets/google.png"
                width={32}
                height={32}
                alt="Logo botao acesso google"
              />
              <span className="text-black">{STR.labelBtnGoogle}</span>
            </div>
          </Button>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/my_todos",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Todo;
