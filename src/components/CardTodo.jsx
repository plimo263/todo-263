import React from "react";
import IconButton from "./IconButton";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import Avatar from "./Avatar";
import { converterDataHora } from "@/utils";
import { Animate } from "./Animations";
/**
 * Card para exibir as tarefas em um design bonito com elevação ao clique no cartão.
 */

const STR = {
  created: "Criada em: ",
  completed: "Concluida em: ",
  titleDelete: "Excluir tarefa do sistema",
};

const classNames = {
  container:
    "p-4 flex gap-4 cursor-pointer items-center shadow-md hover:shadow-lg bg-white dark:bg-slate-800 rounded-lg transition-shadow",
  iconCheck: "text-primary",
  bodyContainer: "flex-1 flex flex-col gap-1",
  textTask: "xs:text-sm md:text-xl text-primary",
  textCreated: "text-xs text-gray-400 dark:text-gray-200",
  textCompleted: "text-md text-green-600 dark:text-green-400",
  iconDelete: "text-red-600",
};

const sizeCheck = 36;

function CardTodo({
  onChecked,
  onEdit,
  onDelete,
  task,
  dateCompleted,
  dateCreated,
  avatar,
  altAvatar,
}) {
  return (
    <div onClick={onEdit} className={classNames.container}>
      <IconButton onClick={onChecked} className="">
        {dateCompleted ? (
          <MdCheckBox className={classNames.iconCheck} size={sizeCheck} />
        ) : (
          <MdCheckBoxOutlineBlank
            className={classNames.iconCheck}
            size={sizeCheck}
          />
        )}
      </IconButton>
      <div className={classNames.bodyContainer}>
        <p className={classNames.textTask}>{task}</p>
        <p className={classNames.textCreated}>
          {dateCreated ? (
            `${STR.created} ${converterDataHora(dateCreated)}`
          ) : (
            <br />
          )}
        </p>
        {dateCompleted ? (
          <Animate animation="fade" duration={0.1}>
            <p className={classNames.textCompleted}>
              {`${STR.completed} ${converterDataHora(dateCompleted)}`}
            </p>
          </Animate>
        ) : (
          <br />
        )}
      </div>
      <Avatar src={avatar} alt={altAvatar} />
      <IconButton title={STR.titleDelete} onClick={onDelete}>
        <MdDelete size={24} className={classNames.iconDelete} />
      </IconButton>
    </div>
  );
}

export default CardTodo;
