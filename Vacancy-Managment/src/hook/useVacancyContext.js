import { useContext } from "react";
import { VacanciesContext } from "../context/contexts";

export default function useVacancyContext() {
  const context = useContext(VacanciesContext);
  if (!context) {
    throw new Error("Não está dentro do contexto");
  }

  return context;
}
