import React, { useCallback, useState } from "react";
import Chip from "./Chip";
import { MdCalendarMonth } from "react-icons/md";
import { format, subDays } from "date-fns";

const STR = {
  titleChip: "Aplique filtro ao periodo ",
};
function FilterPeriod({ onClick }) {
  const [selectedItem, setSelectedItem] = useState("Hoje");
  const periods = ["Hoje", "Ultimos 7 dias", "Neste Mês"];
  //
  const onSetFilter = useCallback(
    (value) => {
      let de, ate;
      switch (value) {
        case "Hoje":
          de = format(new Date(), "yyyy-MM-dd 00:00:00");
          ate = format(new Date(), "yyyy-MM-dd 23:59:59");
          break;
        case "Ultimos 7 dias":
          de = format(subDays(new Date(), 7), "yyyy-MM-dd 00:00:00");
          ate = format(new Date(), "yyyy-MM-dd 23:59:59");
          break;
        default: // Neste mes
          de = format(new Date(), "yyyy-MM-01 00:00:00");
          ate = format(new Date(), "yyyy-MM-dd 23:59:59");
          break;
      }
      setSelectedItem(value);
      onClick(`${de}_${ate}`);
    },
    [onClick, setSelectedItem]
  );

  return (
    <div className="flex gap-2">
      {periods.map((val) => (
        <Chip
          title={`${STR.titleChip} ${val}`}
          key={val}
          onClick={() => onSetFilter(val)}
          label={val}
          variant={selectedItem === val ? "filled" : "outlined"}
          color="secondary"
          icon={<MdCalendarMonth />}
        />
      ))}
    </div>
  );
}

export default FilterPeriod;
