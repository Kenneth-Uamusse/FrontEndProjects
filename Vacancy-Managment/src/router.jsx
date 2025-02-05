import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./pages/layout/DashboardLayout";
import CreateCandidacy from "./pages/CreateCandidacy";
import CreateVacancy from "./pages/CreateVacancy";
import UpdateVacancy from "./pages/UpdateVacancy";
import ShowVacancy from "./pages/ShowVacancy";
import AllVacancies from "./pages/AllVacancies";
import AllCandidacies from "./pages/AllCandidacies";
import Overview from "./pages/Overview";
import { Navigate } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
    errorElement: <h1>Página não encontrada</h1>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Overview /> },
      { path: "createVacancy", element: <CreateVacancy /> },
      { path: "createCandidacy", element: <CreateCandidacy /> },
      { path: "updateVacancy/:id", element: <UpdateVacancy /> },
      { path: "showVacancy/:id", element: <ShowVacancy /> },
      { path: "allVacancies", element: <AllVacancies /> },
      { path: "allCandidacies", element: <AllCandidacies /> },
    ],
  },
]);

export default routes;
