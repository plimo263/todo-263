import { getServerSession } from "next-auth";
import React, { useCallback, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { MdAddTask } from "react-icons/md";
import Fab from "@/components/Fab";
import CardTodo from "@/components/CardTodo";
import Modal from "@/components/Modal";
import CriarTarefa from "./criar_tarefa";
import List from "@/components/List";
import FilterPeriod from "@/components/FilterPeriod";
import { format } from "date-fns";
/**
 * Local onde fica as tarefas do usuário. Este acesso
 * so é exibido quando o usuário esta logado, caso não esteja
 * nada é exibido. Só as tarefas dele são exibidas.
 */

const STR = {
  altAvatar: "Tarefa de",
  labelBtnAdd: "Nova Tarefa",
  titleNoTaskCreate: "Não existem tarefas criadas no filtro informado.",
  descriptionNoTaskCreate:
    "Para criar uma nova tarefa basta clicar no botão de Nova tarefa",
};

function MyTodos({ user, tasks }) {
  const [modal, setModal] = useState(null);
  const [todo, setTodo] = useState(tasks);
  // Marca uma tarefa como concluida
  const onChecked = useCallback(
    async (id) => {
      try {
        const response = await fetch("/api/task", {
          body: JSON.stringify({ id }),
          method: "PUT",
        });
        const task = JSON.parse(await response.json());

        setTodo(
          todo.map((item) => {
            if (item.id === task.id) {
              return task;
            }
            return item;
          })
        );
      } catch (error) {}
    },
    [todo, setTodo]
  );
  // Inicia a intenção de se criar uma nova tarefa
  const intentAddTask = useCallback(() => setModal(true), [setModal]);

  // Criar nova tarefa
  const onAddTask = useCallback(
    async (task) => {
      try {
        const response = await fetch("/api/task", {
          body: JSON.stringify({
            ...task,
            userName: user.email,
            userAvatar: user.image,
          }),
          method: "POST",
        });
        const newTask = JSON.parse(await response.json());
        //
        setTodo((val) => [...val, newTask]);
      } catch (error) {}

      setModal(null);
    },
    [setTodo, user]
  );
  // Exclui a tarefa existente
  const onDeleteTask = useCallback(
    async (id) => {
      if (window.confirm("Deseja realmente excluir a tarefa ?")) {
        try {
          await fetch("/api/task", {
            body: JSON.stringify({ id }),
            method: "DELETE",
          });
          setTodo((todos) => todos.filter((todo) => todo.id !== id));
        } catch (error) {}
      }
    },
    [setTodo]
  );
  // Filtrar os itens
  const onFilterDate = useCallback(
    async (dates) => {
      const [de, ate] = dates.split("_");
      try {
        const response = await fetch(
          `/api/task?user=${user.email}&filter_period=${de}_${ate}`,
          {
            method: "GET",
          }
        );
        const tasks = JSON.parse(await response.json());
        //
        setTodo(tasks);
      } catch (error) {}
    },
    [setTodo, user]
  );

  return (
    <div>
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
        <CriarTarefa onConfirm={onAddTask} />
      </Modal>

      <div className="flex justify-between items-center">
        <FilterPeriod onClick={onFilterDate} />
        <Fab
          color="secondary"
          onClick={intentAddTask}
          className="p-3 z-10 fixed bottom-8 right-4 md:bottom-0 md:relative text-white flex flex-row items-center md:gap-4"
        >
          <MdAddTask size={28} />
          <span className="hidden md:block">{STR.labelBtnAdd}</span>
        </Fab>
      </div>
      {todo.length === 0 ? (
        <div className="flex flex-col items-center space-y-4 mt-2">
          <h3 className="text-3xl pacifico text-center">
            {STR.titleNoTaskCreate}
          </h3>
          <p className="text-gray-500 text-xl">{STR.descriptionNoTaskCreate}</p>
        </div>
      ) : (
        <List
          animation="slide-left"
          interval={0.3}
          items={todo}
          renderItem={({
            task,
            id,
            dateCompleted,
            dateCreated,
            userAvatar,
            userName,
          }) => (
            <CardTodo
              task={task}
              key={id}
              dateCompleted={dateCompleted}
              dateCreated={dateCreated}
              onChecked={() => onChecked(id)}
              onDelete={() => onDeleteTask(id)}
              avatar={userAvatar}
              altAvatar={`${STR.altAvatar} ${userName}`}
            />
          )}
        />
      )}
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  // Se não estiver logado retorne-o para a tela de login
  if (!session) {
    return {
      redirect: {
        destination: "/todo",
        permanent: false,
      },
    };
  }
  let tasks = [];

  // recupera todas as tarefas deste usuario
  try {
    const de = format(new Date(), "yyyy-MM-dd 00:00:00");
    const ate = format(new Date(), "yyyy-MM-dd 23:59:59");
    //
    const response = await fetch(
      `http://localhost:3000/api/task?user=${session.user.email}&filter_period=${de}_${ate}`,
      {
        method: "GET",
      }
    );

    tasks = JSON.parse(await response.json());
  } catch (error) {
    console.log(error);
  }
  // Tudo certo, retorne o usuário na props
  return {
    props: {
      user: session.user,
      tasks,
    },
  };
};

export default MyTodos;
