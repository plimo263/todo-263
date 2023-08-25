import React from "react";
import IconButton from "./IconButton";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import Avatar from "./Avatar";
/**
 * Card para exibir as tarefas em um design bonito com elevação ao clique no cartão.
 */

const STR = {
  created: "Criado em: ",
  completed: "Completado em: ",
};
const sizeCheck = 36;

function CardTodo({
  onChecked,
  task,
  dateCompleted,
  dateCreated,
  avatar,
  altAvatar,
}) {
  return (
    <div
      onClick={onChecked}
      className="p-4 flex gap-2 cursor-pointer items-center shadow-md hover:shadow-xl bg-white rounded-lg transition-shadow"
    >
      <IconButton onClick={() => {}} className="">
        {dateCompleted ? (
          <MdCheckBox className="text-primary" size={sizeCheck} />
        ) : (
          <MdCheckBoxOutlineBlank className="text-primary" size={sizeCheck} />
        )}
      </IconButton>
      <div className="flex-1 flex flex-col gap-1">
        <p className="xs:text-sm md:text-xl text-primary pacifico">{task}</p>

        <p className="text-xs text-gray-400 text-center">
          {dateCompleted ? `${STR.completed} ${dateCompleted}` : <br />}
        </p>
      </div>
      <Avatar src={avatar} alt={altAvatar} />
    </div>
  );
}

export default CardTodo;
