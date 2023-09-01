import { parseISO } from "date-fns";
import { prisma } from "@/db";

const STR = {
  errorNoConnection: "Erro ao tentar se conectar ao banco de dados",
  successRemoveTask: "Tarefa excluída com sucesso",
  errorTaskExcluded: "Erro ao tentar excluir a tarefa",
  errorUserNotLogged: "Usuário não atenticado ou não enviado",
  errorNoIdTaskSend: "Não foi enviado o identificador da tarefa",
  errorNoNameTaskSend: "O nome da tarefa não foi enviado",
};
// Novas tarefas
const requestAddTask = async (res, dataBody) => {
  try {
    const newTask = await prisma.task.create({
      data: JSON.parse(dataBody),
    });
    return res.json(JSON.stringify(newTask));
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
    return res.status(500).json({ message: STR.errorNoConnection });
  }
};
// Consulta sobre as tarefas do usuário
const requestGetTasks = async (res, userLogged, filterPeriod) => {
  // Consulta tarefas do usuário logado
  let whereArgs;

  whereArgs = { userName: userLogged };
  // Enviado busca por data de criação
  if (filterPeriod) {
    const [de, ate] = filterPeriod;
    whereArgs.dateCreated = {
      gte: de,
      lte: ate,
    };
  }

  try {
    const tasks = await prisma.task.findMany({
      where: whereArgs,
    });

    return res.status(200).json(JSON.stringify(tasks));
  } catch (error) {
    return res.status(500).json({ message: STR.errorNoConnection });
  }
};
// Marca/Desmarca uma tarefa como concluida
const requestPatchTask = async (res, idTask) => {
  try {
    // Consulta a tarefa
    const task = await prisma.task.findFirst({
      where: { id: idTask },
    });
    //
    const taskCompleted = task.dateCompleted ? null : new Date();
    // Aplica a atualizacao
    await prisma.task.update({
      where: { id: idTask },
      data: {
        dateCompleted: taskCompleted,
      },
    });
    //
    task.dateCompleted = taskCompleted;
    //
    return res.json(JSON.stringify(task));
  } catch (error) {
    prisma.$disconnect();
    return res.status(500).json({ message: STR.errorNoConnection });
  }
};
// Altera o nome de uma tarefa
const requestPutTask = async (res, idTask, newNameTask) => {
  try {
    // Consulta a tarefa
    const task = await prisma.task.findFirst({
      where: { id: idTask },
    });
    // Aplica a atualizacao
    await prisma.task.update({
      where: { id: idTask },
      data: {
        task: newNameTask,
      },
    });
    //
    task.task = newNameTask;
    //
    return res.json(JSON.stringify(task));
  } catch (error) {
    prisma.$disconnect();
    return res.status(500).json({ message: STR.errorNoConnection });
  }
};
// Exclui uma tarefa do sistema
const requestDelTask = async (res, idTask) => {
  try {
    // Aplica a atualizacao
    await prisma.task.delete({
      where: { id: idTask },
    });
    return res.json({ sucesso: STR.successRemoveTask });
  } catch (error) {
    prisma.$disconnect();
    res.status(500).json({ message: STR.errorTaskExcluded });
  }
};
//
export default async function apiTask(req, res) {
  // Inserir uma nova tarefa
  switch (req.method) {
    case "POST":
      return requestAddTask(res, req.body);
    case "GET":
      const userLogged = req.query?.user;
      // Caso exista periodo realizar filtro
      const filterPeriod = req.query?.filter_period
        ? req.query.filter_period.split("_").map((date) => parseISO(date))
        : null;
      if (!userLogged) {
        return res.status(500).json({ message: STR.errorUserNotLogged });
      }
      return requestGetTasks(res, userLogged, filterPeriod);
    case "PATCH":
      return (() => {
        const data = JSON.parse(req.body);
        if (!data.id) {
          return res.status(500).json({ message: STR.errorNoIdTaskSend });
        }
        return requestPatchTask(res, data.id);
      })();
    case "PUT":
      return (() => {
        const data = JSON.parse(req.body); // Recupera o id e o novo nome da tarefa
        if (!data.id) {
          return res.status(500).json({ message: STR.errorNoIdTaskSend });
        } else if (!data.task) {
          return res.status(500).json({ message: STR.errorNoNameTaskSend });
        }
        return requestPutTask(res, data.id, data.task);
      })();
    case "DELETE":
      return (() => {
        const data = JSON.parse(req.body);
        if (!data.id) {
          return res.status(500).json({ message: STR.errorNoIdTaskSend });
        }
        return requestDelTask(res, data.id);
      })();
    default:
      break;
  }
}
