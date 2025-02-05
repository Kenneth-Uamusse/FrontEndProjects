import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import RegisterClient from "./pages/RegisterClient";
import CreateBooking from "./pages/CreateBooking";
import Clients from "./pages/Clients";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "createBooking",
        element: <CreateBooking />,
      },
      {
        path: "registerCustomer",
        element: <RegisterClient />, // Rota para cadastrar cliente
      },
      {
        path: "editClient/:id", // Rota para editar cliente
        element: <RegisterClient />, // Reutiliza o mesmo componente RegisterClient
      },
    ],
  },
]);

export default router;
