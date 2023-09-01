import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Chip from "./Chip";
import { MdCalendarMonth, MdSearch } from "react-icons/md";
import { format, parseISO, subDays } from "date-fns";
import Modal from "./Modal";
import TextField from "./TextField";
import Fab from "./Fab";
import { Animate } from "./Animations";

const STR = {
  titleChip: "Aplique filtro ao periodo ",
  titleSeletedPeriod: "Escolha o periodo",
  labelBtnSeletedPeriod: "Filtrar Periodo",
  errorPeriod: "A data DE e ATE devem ser preenchidas",
  errorPeriod2: "A data DE é maior que a data ATÉ",
  labelDe: "Data de",
  labelAte: "Data Até",
  today: "Hoje",
  last7Days: "Ultimos 7 dias",
  thisMonth: "Este Mês",
  period: "Periodo",
};

const classNames = {
  containerPeriod: "flex flex-col items-center h-full dark:bg-slate-800 p-4",
  titlePeriod: "pacifico text-2xl md:text-4xl mb-4",
  containerDates: "flex items-center gap-4 mb-4",
  containerFieldDate: "flex flex-col",
  labelDate: "text-secondary",
  error: "text-red-500 text-lg mb-2",
  btn: "flex gap-2 text-white p-3",
  btnLabel: "text-xl",
};

// Padrões de datas que devem ser usados na saida
const formatDe = "yyyy-MM-dd 00:00:00";
const formatAte = "yyyy-MM-dd 23:59:59";

function FilterPeriod({ onClick }) {
  const [modal, setModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState("Hoje");
  const periods = [STR.today, STR.last7Days, STR.thisMonth, STR.period];
  // Indica rotulos dos filtros que não devem ser alterados nos chips
  const filtersDefaultLabel = [STR.today, STR.last7Days, STR.thisMonth];
  //
  const onSetFilter = useCallback(
    (value) => {
      let de, ate;

      switch (value) {
        case STR.today:
          de = format(new Date(), formatDe);
          ate = format(new Date(), formatAte);
          break;
        case STR.last7Days:
          de = format(subDays(new Date(), 7), formatDe);
          ate = format(new Date(), formatAte);
          break;
        case STR.thisMonth:
          de = format(new Date(), "yyyy-MM-01 00:00:00");
          ate = format(new Date(), formatAte);
          break;
        default: // Periodo
          setModal(true);
          break;
      }
      if (de && ate) {
        setSelectedItem(value);
        onClick(`${de}_${ate}`);
      }
    },
    [onClick, setSelectedItem]
  );
  //
  const onSave = useCallback(
    (de, ate) => {
      setModal(null);
      const [newDe, newAte] = [de, ate].map((date, idx) =>
        format(parseISO(date), idx === 0 ? formatDe : formatAte)
      );
      setSelectedItem(
        `${format(parseISO(de), "dd/MM/yy")} - ${format(
          parseISO(ate),
          "dd/MM/yy"
        )}`
      );
      onClick(`${newDe}_${newAte}`);
    },
    [onClick]
  );

  return (
    <div className="flex gap-2">
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
        <SelectedPeriod onSave={onSave} />
      </Modal>
      {periods.map((val) => (
        <Chip
          title={`${STR.titleChip} ${val}`}
          key={val}
          onClick={() => onSetFilter(val)}
          label={
            val === STR.period && !filtersDefaultLabel.includes(selectedItem)
              ? selectedItem
              : val
          }
          variant={
            (val === STR.period &&
              !filtersDefaultLabel.includes(selectedItem)) ||
            selectedItem === val
              ? "filled"
              : "outlined"
          }
          color="secondary"
          icon={<MdCalendarMonth />}
        />
      ))}
    </div>
  );
}
//
const SelectedPeriod = ({ onSave }) => {
  const [error, setError] = useState(null);
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");

  const onClick = useCallback(() => {
    if (!de || !ate) {
      setError(STR.errorPeriod);
    } else if (ate < de) {
      setError(STR.errorPeriod2);
    } else {
      setError(null);

      onSave(de, ate);
    }
  }, [onSave, setError, de, ate]);
  return (
    <div className={classNames.containerPeriod}>
      <h1 className={classNames.titlePeriod}>{STR.titleSeletedPeriod}</h1>
      <div className={classNames.containerDates}>
        <div className={classNames.containerFieldDate}>
          <label htmlFor="de">
            <span className={classNames.labelDate}>{STR.labelDe}</span>
          </label>
          <TextField
            id="de"
            onChange={(e) => setDe(e.target.value)}
            value={de}
            type="date"
          />
        </div>
        <div className={classNames.containerFieldDate}>
          <label htmlFor="ate">
            <span className={classNames.labelDate}>{STR.labelAte}</span>
          </label>
          <TextField
            id="ate"
            onChange={(e) => setAte(e.target.value)}
            value={ate}
            type="date"
          />
        </div>
      </div>
      {error && (
        <Animate animation="grow">
          <p className={classNames.error}>{error}</p>
        </Animate>
      )}
      <Fab className={classNames.btn} color="secondary" onClick={onClick}>
        <MdSearch size={24} />
        <span className={classNames.btnLabel}>{STR.labelBtnSeletedPeriod}</span>
      </Fab>
    </div>
  );
};

FilterPeriod.propTypes = {
  /* Uma função de para receber o filtro de data aplicado */
  onClick: PropTypes.func.isRequired,
};

export default FilterPeriod;
