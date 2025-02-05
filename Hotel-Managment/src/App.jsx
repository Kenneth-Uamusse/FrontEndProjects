  import { RouterProvider } from "react-router-dom";
  import { BookingProvider } from "./context/BookingContext";
  import router from "./router";

  export default function App() {
    return (
      <BookingProvider>
        <RouterProvider router={router} />
      </BookingProvider>
    );
  }
