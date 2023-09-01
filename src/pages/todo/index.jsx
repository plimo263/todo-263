import Button from "@/components/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
/**
 * Area de login, os principais providers ficam aqui para o usuário se autenticar.
 */

const classNames = {
  container: "container mx-auto",
  title: "text-center text-4xl pacifico mb-4",
  description: "text-center",
  containerBtn: "mt-4 flex justify-center",
  btn: "w-full px-4 py-2 md:w-auto bg-slate-100 dark:bg-slate-700 border-none shadow-md transition hover:scale-105 active:scale-95",
  btnChild: "flex justify-center items-center gap-2",
  textBtnChild: "text-xl text-black dark:dark:text-gray-200",
};

const STR = {
  title: "To-do 263",
  phrase:
    "Crie tarefas e pequenas atividades do seu dia a dia com esta ferramenta. Para começar a utilizar faça login.",
  labelBtnGoogle: "Continuar com o Google",
};

function Todo() {
  return (
    <div>
      <main className={classNames.container}>
        <h1 className={classNames.title}>{STR.title}</h1>
        <p className={classNames.description}>{STR.phrase}</p>

        <div className={classNames.containerBtn}>
          <Button
            onClick={signIn}
            variant="outlined"
            className={classNames.btn}
          >
            <div className={classNames.btnChild}>
              <Image
                src="/assets/google.png"
                width={32}
                height={32}
                alt="Logo botao acesso google"
              />
              <span className={classNames.textBtnChild}>
                {STR.labelBtnGoogle}
              </span>
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
