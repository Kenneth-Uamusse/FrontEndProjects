import { useContext } from "react";
import { CandidacyContext } from "../context/contexts";

export default function useCandidacyContext() {
  const context = useContext(CandidacyContext);

  if (!context) {
    throw new Error("Não está dentro do contexto");
  }

  return context;
}
