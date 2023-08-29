import Fab from "@/components/Fab";
import TextField from "@/components/TextField";
import isHotkey from "is-hotkey";
import { uniqueId } from "lodash";
import React, { useCallback, useState } from "react";
import { MdAddTask, MdEdit } from "react-icons/md";
/**
 *  Local para registrar uma nova tarefa no sistema.
 */

const STR = {
  titleCreate: "Nova Tarefa",
  descriptionCreate: "Digite abaixo o nome da sua super tarefa hoje",
  labelBtnCreate: "Criar Tarefa",
  placeholderCreate: "Digite o nome da tarefa",
  titleEdit: "Editar Tarefa",
  descriptionEdit: "Altere o nome da tarefa",
  labelBtnEdit: "Editar Tarefa",
};
// Teclas de atalho para execução de recursos com combinação.
const HOTKEY_VALIDADOR = {
  enter: (evt) => isHotkey("enter")(evt),
};

function ManutencaoTarefa({ onConfirm, id, task }) {
  const [value, setValue] = useState(task || "");
  //
  const onSubmit = useCallback(() => {
    let obj = {};
    if (id) {
      // Se existir é uma edicao de tarefa
      obj = {
        task: value,
        id,
      };
    } else {
      obj = {
        task: value,
        dateCreated: new Date(),
        dateCompleted: null,
      };
    }
    onConfirm(obj);
  }, [id, value, onConfirm]);
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
        let obj = {};

        if (id) {
          // E uma edicao de tarefa
        } else {
          obj = {
            task: value,
            dateCreated: new Date(),
            dateCompleted: null,
          };
        }
        onConfirm(obj);
      }
    },
    [id, value, onConfirm]
  );
  //
  return (
    <div className="h-full flex flex-col items-center gap-2">
      <h1 className="text-4xl">{STR[id ? "titleEdit" : "titleCreate"]}</h1>
      <p className="text-gray-500 text-xl mb-2">
        {STR[id ? "descriptionEdit" : "descriptionCreate"]}
      </p>
      <TextField
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
        autoFocus
        placeholder={STR.placeholderCreate}
        className="self-stretch"
      />
      <Fab
        disabled={value.length === 0}
        color="secondary"
        className="gap-2 flex items-center px-4 text-white"
        onClick={onSubmit}
      >
        {id ? <MdEdit size={24} /> : <MdAddTask size={24} />}
        <span className="pacifico text-2xl">
          {STR[id ? "labelBtnEdit" : "labelBtnCreate"]}
        </span>
      </Fab>
    </div>
  );
}

export default ManutencaoTarefa;
