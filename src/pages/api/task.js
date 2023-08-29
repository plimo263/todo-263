import { parseISO } from "date-fns";
import { prisma } from "@/db";

export default async function (req, res) {
  //
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const newTask = await prisma.task.create({
        data,
      });
      return res.json(JSON.stringify(newTask));
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      res.status(500).json({ message: "Erro ao tentar a tarefa no banco" });
    }
  } else if (req.method === "GET") {
    // Consulta tarefas do usuário logado
    let whereArgs;
    if (req.query?.user) {
      whereArgs = { userName: req.query.user };
    }
    if (req.query?.filter_period) {
      let [de, ate] = req.query.filter_period.split("_");
      (de = parseISO(de)), (ate = parseISO(ate));

      whereArgs.dateCreated = {
        gte: de,
        lte: ate,
      };
    }

    const tasks = await prisma.task.findMany({
      where: whereArgs,
    });

    return res.status(200).json(JSON.stringify(tasks));
  } else if (req.method === "PATCH") {
    try {
      const data = JSON.parse(req.body); // Recupera o id e o novo nome da tarefa
      // Consulta a tarefa
      const task = await prisma.task.findFirst({
        where: { id: data.id },
      });
      // Aplica a atualizacao
      await prisma.task.update({
        where: { id: data.id },
        data: {
          task: data.task,
        },
      });
      //
      task.task = data.task;
      //
      return res.json(JSON.stringify(task));
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      res
        .status(500)
        .json({ message: "Erro ao tentar atualizar a tarefa no banco" });
    }
  } else if (req.method === "PUT") {
    try {
      const data = JSON.parse(req.body); // Recupera o id da tarefa a atualiza
      // Consulta a tarefa
      const task = await prisma.task.findFirst({
        where: { id: data.id },
      });
      //
      const taskCompleted = task.dateCompleted ? null : new Date();
      // Aplica a atualizacao
      await prisma.task.update({
        where: { id: data.id },
        data: {
          dateCompleted: taskCompleted,
        },
      });
      //
      task.dateCompleted = taskCompleted;
      //
      return res.json(JSON.stringify(task));
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      res
        .status(500)
        .json({ message: "Erro ao tentar atualizar a tarefa no banco" });
    }
  } else if (req.method == "DELETE") {
    try {
      const data = JSON.parse(req.body); // Recupera o id da tarefa a atualiza
      // Aplica a atualizacao
      await prisma.task.delete({
        where: { id: data.id },
      });

      return res.json({ sucesso: "Tarefa excluida com sucesso." });
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      res.status(500).json({ message: "Erro ao tentar excluir a tarefa" });
    }
  }
}
