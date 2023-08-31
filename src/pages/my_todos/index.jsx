import { getServerSession } from "next-auth";
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { MdAddTask } from "react-icons/md";
import Fab from "@/components/Fab";
import CardTodo from "@/components/CardTodo";
import Modal from "@/components/Modal";
import List from "@/components/List";
import FilterPeriod from "@/components/FilterPeriod";
import { format, parseISO } from "date-fns";
import ManutencaoTarefa from "./manutencao_tarefa";
import { prisma } from "@/db";
import { Animate, Fade } from "@/components/Animations";
/**
 * Local onde fica as tarefas do usuário. Este acesso
 * so é exibido quando o usuário esta logado, caso não esteja
 * nada é exibido. Só as tarefas dele são exibidas.
 */
const TodoDispatch = createContext(null);

const STR = {
  altAvatar: "Tarefa de",
  labelBtnAdd: "Nova Tarefa",
  titleNoTaskCreate: "Não existem tarefas criadas no filtro informado.",
  descriptionNoTaskCreate:
    "Para criar uma nova tarefa basta clicar no botão de Nova tarefa",
  questionConfirmDelete: "Deseja realmente excluir a tarefa ?",
};
// Organização das classes aplicadas aos itens da pagina
const CLASSNAMES = {
  container: "flex justify-between items-center",
  btnAddColor: "secondary",
  btnAdd:
    "p-3 z-10 fixed bottom-8 right-4 md:bottom-0 md:relative text-white flex flex-row items-center md:gap-4",
  btnAddLabel: "hidden md:block",
  containerNoTask: "flex flex-col items-center space-y-4 mt-2",
  titleNoTask: "text-3xl pacifico text-center",
  descriptionNoTask: "text-gray-500 text-xl",
};

const MODAL = {
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
};

// Possiveis acoes sobre os dados
const ACTION = {
  ADD: "ADD",
  DEL: "DEL",
  TOGGLE_CHECK: "TOGGLE_CHECK",
  EDIT: "EDIT",
  INIT: "INIT",
  FILTER: "FILTER",
};
// Criar nova tarefa
const addNewTask = async (task, dispatch) => {
  try {
    const response = await fetch("/api/task", {
      body: JSON.stringify(task),
      method: "POST",
    });
    const newTask = JSON.parse(await response.json());
    //
    dispatch({ type: ACTION.ADD, data: newTask });
  } catch (error) {}
};
// Excluir tarefa
const delTask = async (id, dispatch) => {
  try {
    await fetch("/api/task", {
      body: JSON.stringify({ id }),
      method: "DELETE",
    });
    dispatch({ type: ACTION.DEL, data: id });
  } catch (error) {}
};
// Editar tarefa
const editTask = async (id, taskDescription, dispatch) => {
  try {
    const response = await fetch("/api/task", {
      body: JSON.stringify({
        id,
        task: taskDescription,
      }),
      method: "PUT",
    });
    const task = JSON.parse(await response.json());
    //
    dispatch({ type: ACTION.EDIT, data: task });
  } catch (error) {}
};
// Filtrar tarefas baseado na data enviada
const filterTasks = async (dates, user, dispatch) => {
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
    dispatch({ type: ACTION.FILTER, data: tasks });
  } catch (error) {}
};
// marcar/desmarcar tarefa como concluida
const completedTask = async (id, dispatch) => {
  try {
    const response = await fetch("/api/task", {
      body: JSON.stringify({ id }),
      method: "PATCH",
    });
    const task = JSON.parse(await response.json());
    dispatch({ type: ACTION.TOGGLE_CHECK, data: task });
  } catch (error) {}
};
// Redutor para centralizar o estado da pagina
const todosReducer = (state, action) => {
  switch (action.type) {
    case ACTION.INIT:
    case ACTION.FILTER:
      return action.data;
    case ACTION.ADD:
      return [action.data, ...state];
    case ACTION.DEL:
      return state.filter((ele) => ele.id !== action.data);
    case ACTION.TOGGLE_CHECK:
    case ACTION.EDIT:
      return state.map((ele) => {
        if (ele.id === action.data.id) {
          return action.data;
        }
        return ele;
      });
    default:
      return state;
  }
};

function MyTodosContext({ user, tasks }) {
  const [todos, dispatch] = useReducer(todosReducer, tasks);
  return (
    <TodoDispatch.Provider value={dispatch}>
      <MyTodos user={user} tasks={todos} />
    </TodoDispatch.Provider>
  );
}

function MyTodos({ user, tasks }) {
  const [modal, setModal] = useState(null);
  const dispatch = useContext(TodoDispatch);

  // Marca uma tarefa como concluida
  const onChecked = useCallback(
    async (id) => {
      completedTask(id, dispatch);
    },
    [dispatch]
  );
  // Criar nova tarefa
  const onAddTask = useCallback(
    async (task) => {
      const newTask = {
        ...task,
        userName: user.email,
        userAvatar: user.image,
      };
      addNewTask(newTask, dispatch);
      setModal(null);
    },
    [dispatch, setModal, user]
  );
  // Exclui a tarefa existente
  const onDeleteTask = useCallback(
    async (id) => {
      if (window.confirm(STR.questionConfirmDelete)) {
        delTask(id, dispatch);
      }
    },
    [dispatch]
  );
  // Filtrar os itens
  const onFilterDate = useCallback(
    async (dates) => {
      filterTasks(dates, user, dispatch);
    },
    [dispatch, user]
  );
  // Editar as tarefas
  const onEditTask = useCallback(
    async (taskEdit) => {
      editTask(taskEdit.id, taskEdit.task, dispatch);
      setModal(null);
    },
    [setModal, dispatch]
  );

  return (
    <div>
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
        {modal ? (
          modal.type === MODAL.CREATE_TASK ? (
            <ManutencaoTarefa onConfirm={onAddTask} />
          ) : (
            <ManutencaoTarefa
              task={modal.data.task}
              id={modal.data.id}
              onConfirm={onEditTask}
            />
          )
        ) : null}
      </Modal>

      <div className={CLASSNAMES.container}>
        <FilterPeriod onClick={onFilterDate} />
        <Animate animation="grow">
          <Fab
            color={CLASSNAMES.btnAddColor}
            onClick={() => setModal({ type: MODAL.CREATE_TASK })}
            className={CLASSNAMES.btnAdd}
          >
            <MdAddTask size={28} />
            <span className={CLASSNAMES.btnAddLabel}>{STR.labelBtnAdd}</span>
          </Fab>
        </Animate>
      </div>
      {tasks.length === 0 ? (
        <div className={CLASSNAMES.containerNoTask}>
          <h3 className={CLASSNAMES.titleNoTask}>{STR.titleNoTaskCreate}</h3>
          <p className={CLASSNAMES.descriptionNoTask}>
            {STR.descriptionNoTaskCreate}
          </p>
        </div>
      ) : (
        <List
          animation="slide-left"
          interval={0.1}
          items={tasks}
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
              onChecked={(e) => {
                e.stopPropagation();
                onChecked(id);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                onDeleteTask(id);
              }}
              onEdit={() =>
                setModal({ type: MODAL.EDIT_TASK, data: { id, task } })
              }
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
    // Faz um filtro para pegar as tarefas de hoje
    const de = parseISO(format(new Date(), "yyyy-MM-dd 00:00:00"));
    const ate = parseISO(format(new Date(), "yyyy-MM-dd 23:59:59"));
    // Consulta tarefas do usuário logado
    const whereArgs = {
      userName: session.user.email,
      dateCreated: {
        gte: de,
        lte: ate,
      },
    };
    tasks = JSON.parse(
      JSON.stringify(
        await prisma.task.findMany({
          where: whereArgs,
        })
      )
    );
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

export default MyTodosContext;
