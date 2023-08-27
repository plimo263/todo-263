import Fab from "@/components/Fab";
import TextField from "@/components/TextField";
import { uniqueId } from "lodash";
import React, { useCallback, useState } from "react";
import { MdAddTask } from "react-icons/md";
/**
 *  Local para registrar uma nova tarefa no sistema.
 */

const STR = {
  labelBtn: "Criar Tarefa",
  placeholder: "Digite o nome da tarefa",
};

function CriarTarefa({ onConfirm }) {
  const [value, setValue] = useState("");
  //
  const onSubmit = useCallback(() => {
    onConfirm({
      id: uniqueId(),
      task: value,
      dateCreated: new Date(),
      dateCompleted: null,
    });
  }, [value, onConfirm]);
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <TextField
        onChange={(e) => setValue(e.target.value)}
        value={value}
        autoFocus
        placeholder={STR.placeholder}
        className="self-stretch"
      />
      <Fab
        disabled={value.length === 0}
        color="secondary"
        className="gap-2 flex items-center px-4 text-white"
        onClick={onSubmit}
      >
        <MdAddTask size={24} />
        <span className="pacifico text-2xl">{STR.labelBtn}</span>
      </Fab>
    </div>
  );
}

export default CriarTarefa;
