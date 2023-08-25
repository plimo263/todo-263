"use client";

import { getServerSession } from "next-auth";
import React, { useCallback, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { MdAddTask } from "react-icons/md";
import Fab from "@/components/Fab";
import CardTodo from "@/components/CardTodo";
import Modal from "@/components/Modal";
import CriarTarefa from "./criar_tarefa";
/**
 * Local onde fica as tarefas do usuário. Este acesso
 * so é exibido quando o usuário esta logado, caso não esteja
 * nada é exibido. Só as tarefas dele são exibidas.
 */

const STR = {
  altAvatar: "Tarefa de",
  labelBtnAdd: "Nova Tarefa",
};

function MyTodos({ user }) {
  const [modal, setModal] = useState(null);
  const [todo, setTodo] = useState([
    {
      user: user,
      id: 1,
      dateCreated: new Date().toLocaleDateString("pt-br"),
      dateCompleted: new Date().toLocaleDateString("pt-br"),
      task: "Realizar limpeza da casa.",
    },
  ]);
  // Marca uma tarefa como concluida
  const onChecked = useCallback(
    (id) => {
      setTodo(
        todo.map((item) => {
          if (item.id === id) {
            item.dateCompleted = item.dateCompleted
              ? null
              : new Date().toLocaleDateString("pt-br");
          }
          return item;
        })
      );
    },
    [todo, setTodo]
  );

  // Inicia a intenção de se criar uma nova tarefa
  const intentAddTask = useCallback(() => setModal(true), [setModal]);

  // Criar nova tarefa
  const onAddTask = useCallback(
    (task) => {
      task.user = user;
      setTodo((val) => [...val, task]);
      setModal(null);
    },
    [setTodo, user]
  );

  return (
    <div>
      {modal && (
        <Modal onClose={() => setModal(null)}>
          <CriarTarefa onConfirm={onAddTask} />
        </Modal>
      )}
      <p className="flex justify-end">
        <Fab
          color="secondary"
          onClick={intentAddTask}
          className="p-3 z-10 fixed bottom-8 right-4 md:bottom-0 md:relative md:gap-4 flex items-center text-white"
        >
          <MdAddTask size={28} />
          <span className="hidden md:block">{STR.labelBtnAdd}</span>
        </Fab>
      </p>
      <ul className="space-y-2 mt-2">
        {todo.map(({ task, id, dateCompleted, dateCreated, user }) => (
          <CardTodo
            task={task}
            key={id}
            dateCompleted={dateCompleted}
            dateCreated={dateCreated}
            onChecked={() => onChecked(id)}
            avatar={user?.image}
            altAvatar={`${STR.altAvatar} ${user?.name}`}
          />
        ))}
      </ul>
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
  // Tudo certo, retorne o usuário na props
  return {
    props: {
      user: session.user,
    },
  };
};

export default MyTodos;
