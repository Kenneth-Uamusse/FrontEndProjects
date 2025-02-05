import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import Client from "../models/Client";

export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const id = uuidv4();

  const [clients, setClients] = useState(() => {
    const storedClients = localStorage.getItem("clients");
    return storedClients ? JSON.parse(storedClients) : [];
  });

  const registerClient = (name, email, phone) => {
    const newClient = new Client(id, name, email, phone);
    setClients((current) => {
      const newClients = [newClient, ...current];
      localStorage.setItem("clients", JSON.stringify(newClients));
      console.log(newClients);

      return newClients;
    });
  };

  const updateClient = (id, updatedClient) => {
    setClients((current) => {
      const updatedClients = current.map((client) =>
        client.id === id ? { ...clients, ...updatedClient } : client
      );
      localStorage.setItem("clients", JSON.stringify(updatedClients));

      return updatedClients;
    });
  };

  const deleteClient = (clientId) => {
    setClients((current) => {
      const newClients = current.filter((client) => client.id !== clientId);
      localStorage.setItem("clients", JSON.stringify(newClients));

      return newClients;
    });
  };

  return (
    <BookingContext.Provider
      value={{
        clients,
        registerClient,
        updateClient,
        deleteClient,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

BookingProvider.propTypes = {
  children: PropTypes.node,
};
