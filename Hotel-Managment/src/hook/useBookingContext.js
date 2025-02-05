import { BookingContext } from "../context/BookingContext";
import { useContext } from "react";

export default function useBookingContext() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("Não está dentro do contexto");
  }

  return context;
}
