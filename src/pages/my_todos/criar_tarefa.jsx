import Fab from "@/components/Fab";
import TextField from "@/components/TextField";
import isHotkey from "is-hotkey";
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
// Teclas de atalho para execução de recursos com combinação.
const HOTKEY_VALIDADOR = {
  enter: (evt) => isHotkey("enter")(evt),
};

function CriarTarefa({ onConfirm }) {
  const [value, setValue] = useState("");
  //
  const onSubmit = useCallback(() => {
    onConfirm({
      task: value,
      dateCreated: new Date(),
      dateCompleted: null,
    });
  }, [value, onConfirm]);
  //
  const onChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [onConfirm, setValue]
  );
  //
  const onKeyUp = useCallback(
    (e) => {
      if (HOTKEY_VALIDADOR.enter(e)) {
        onConfirm({
          task: value,
          dateCreated: new Date(),
          dateCompleted: null,
        });
      }
    },
    [value, onConfirm]
  );
  //
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <TextField
        onChange={onChange}
        onKeyUp={onKeyUp}
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
