import React, { useState } from "react";
import Chip from "./Chip";
import { MdCalendarMonth } from "react-icons/md";

const STR = {
  titleChip: "Aplique filtro ao periodo ",
};
function FilterPeriod({ onClick }) {
  const [selectedItem, setSelectedItem] = useState("Hoje");

  const periods = ["Hoje", "Ultimos 7 dias", "Neste Mês"];
  return (
    <div className="flex gap-2">
      {periods.map((val) => (
        <Chip
          title={`${STR.titleChip} ${val}`}
          key={val}
          onClick={() => setSelectedItem(val)}
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
