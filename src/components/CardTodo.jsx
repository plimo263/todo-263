import React from "react";
import IconButton from "./IconButton";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import Avatar from "./Avatar";
import { format } from "date-fns";
/**
 * Card para exibir as tarefas em um design bonito com elevação ao clique no cartão.
 */

const STR = {
  created: "Criado em: ",
  completed: "Completado em: ",
  titleDelete: "Excluir tarefa do sistema",
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
    <div
      onClick={onEdit}
      className="p-4 flex gap-4 cursor-pointer items-center shadow-md hover:shadow-lg bg-white rounded-lg transition-shadow"
    >
      <IconButton onClick={onChecked} className="">
        {dateCompleted ? (
          <MdCheckBox className="text-primary" size={sizeCheck} />
        ) : (
          <MdCheckBoxOutlineBlank className="text-primary" size={sizeCheck} />
        )}
      </IconButton>
      <div className="flex-1 flex flex-col gap-1">
        <p className="xs:text-sm md:text-xl text-primary pacifico">{task}</p>

        <p className="text-xs text-gray-400 text-center">
          {dateCompleted ? (
            `${STR.completed} ${format(dateCompleted, "dd/MM/yy HH:mm")}`
          ) : (
            <br />
          )}
        </p>
      </div>
      <Avatar src={avatar} alt={altAvatar} />
      <IconButton title={STR.titleDelete} onClick={onDelete}>
        <MdDelete size={24} className="text-red-600" />
      </IconButton>
    </div>
  );
}

export default CardTodo;
