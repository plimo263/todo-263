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
/**
 * Local onde fica as tarefas do usuário. Este acesso
 * so é exibido quando o usuário esta logado, caso não esteja
 * nada é exibido. Só as tarefas dele são exibidas.
 */

const STR = {
  altAvatar: "Tarefa de",
  labelBtnAdd: "Nova Tarefa",
  titleNoTaskCreate: "Não existem tarefas criadas",
  descriptionNoTaskCreate:
    "Para criar uma nova tarefa basta clicar no botão de Nova tarefa",
};

function MyTodos({ user }) {
  const [modal, setModal] = useState(null);
  const [todo, setTodo] = useState([]);
  // Marca uma tarefa como concluida
  const onChecked = useCallback(
    (id) => {
      setTodo(
        todo.map((item) => {
          if (item.id === id) {
            item.dateCompleted = item.dateCompleted ? null : new Date();
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
  // Exclui a tarefa existente
  const onDeleteTask = useCallback(
    (id) => {
      if (window.confirm("Deseja realmente excluir a tarefa ?")) {
        setTodo((todos) => todos.filter((todo) => todo.id !== id));
      }
    },
    [setTodo]
  );

  return (
    <div>
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
        <CriarTarefa onConfirm={onAddTask} />
      </Modal>

      <div className="flex justify-between items-center">
        <FilterPeriod />
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
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-3xl pacifico">{STR.titleNoTaskCreate}</h3>
          <p className="text-gray-500 text-xl">{STR.descriptionNoTaskCreate}</p>
        </div>
      ) : (
        <List
          animation="slide-left"
          interval={0.3}
          items={todo}
          renderItem={({ task, id, dateCompleted, dateCreated, user }) => (
            <CardTodo
              task={task}
              key={id}
              dateCompleted={dateCompleted}
              dateCreated={dateCreated}
              onChecked={() => onChecked(id)}
              onDelete={() => onDeleteTask(id)}
              avatar={user?.image}
              altAvatar={`${STR.altAvatar} ${user?.name}`}
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
  // Tudo certo, retorne o usuário na props
  return {
    props: {
      user: session.user,
    },
  };
};

export default MyTodos;
