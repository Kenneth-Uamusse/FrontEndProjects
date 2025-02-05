import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../../public/logo.png";

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <header>
        <img src={logo} alt="Hotel Logo" className="logo" />
        <h2>Hotel Texeira</h2>
      </header>
      <hr />
      <div className="tabs">
        <Link
          to="/home"
          className={`tab ${pathname === "/home" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/bookings"
          className={`tab ${pathname === "/bookings" ? "active" : ""}`}
        >
          Bookings
        </Link>
        <Link
          to="/clients"
          className={`tab ${pathname === "/clients" ? "active" : ""}`}
        >
          Clients
        </Link>
        <Link
          to="/createBooking"
          className={`tab ${pathname === "/createBooking" ? "active" : ""}`}
        >
          Create Booking
        </Link>
        <Link
          to="/registerCustomer"
          className={`tab ${pathname === "/registerCustomer" ? "active" : ""}`}
        >
          Register Client
        </Link>
      </div>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}
