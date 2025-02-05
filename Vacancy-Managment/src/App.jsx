import { RouterProvider } from "react-router-dom";
import { VacanciesProvider } from "./context/VacanciesContext";
import { CandidacyProvider } from "./context/CandidacyContext";
import "react-toastify/dist/ReactToastify.css"; // Importa os estilos do Toastify
import { ToastContainer, Bounce } from "react-toastify";
import routes from "./router";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <VacanciesProvider>
        <CandidacyProvider>
          <RouterProvider
            router={routes}
            future={{ v7_startTransition: true }}
          />
        </CandidacyProvider>
      </VacanciesProvider>
    </>
  );
}
