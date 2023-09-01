import Fab from "@/components/Fab";
import TextField from "@/components/TextField";
import isHotkey from "is-hotkey";
import React, { useCallback, useState } from "react";
import { MdAddTask, MdEdit } from "react-icons/md";
/**
 *  Local para registrar uma nova tarefa no sistema.
 */

const classNames = {
  container: "h-full flex flex-col items-center gap-2 dark:bg-slate-800 p-2",
  title: "text-4xl",
  description: "text-gray-500 dark:text-gray-200 text-xl mb-2",
  btn: "gap-2 flex items-center px-4 text-white",
  textField: "self-stretch mb-2",
  btnLabel: "pacifico text-2xl",
};

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
    [setValue]
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
    <div className={classNames.container}>
      <h1 className={classNames.title}>
        {STR[id ? "titleEdit" : "titleCreate"]}
      </h1>
      <p className={classNames.description}>
        {STR[id ? "descriptionEdit" : "descriptionCreate"]}
      </p>
      <TextField
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
        autoFocus
        placeholder={STR.placeholderCreate}
        className={classNames.textField}
      />
      <Fab
        disabled={value.length === 0}
        color="secondary"
        className={classNames.btn}
        onClick={onSubmit}
      >
        {id ? <MdEdit size={24} /> : <MdAddTask size={24} />}
        <span className={classNames.btnLabel}>
          {STR[id ? "labelBtnEdit" : "labelBtnCreate"]}
        </span>
      </Fab>
    </div>
  );
}

export default ManutencaoTarefa;
