import { format, isDate, parseISO } from "date-fns";

export function converterDataHora(valor) {
  return valor
    ? format(isDate(valor) ? valor : parseISO(valor), "dd/MM/yy HH:mm:ss")
    : valor;
}

export function converterPercentual(valor) {
  let newValor = (valor * 100).toFixed(2);
  return isNaN(newValor) ? "0.00 %" : newValor + " %";
}

export function converterData(valor) {
  return isDate(valor)
    ? format(valor, "dd/MM/yyyy")
    : format(parseISO(valor), "dd/MM/yyyy");
}
