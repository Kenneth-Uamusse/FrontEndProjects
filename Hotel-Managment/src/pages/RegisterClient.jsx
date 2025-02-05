import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useBookingContext from "../hook/useBookingContext";

export default function RegisterClient() {
  const { registerClient, updateClient } = useBookingContext();
  const { id } = useParams(); 

  const [client, setClient] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      // Buscar cliente no localStorage se o ID estiver presente
      const clients = JSON.parse(localStorage.getItem("clients")) || [];
      const foundClient = clients.find((client) => client.id === id);
      if (foundClient) {
        setClient(foundClient);
        setName(foundClient.name);
        setEmail(foundClient.email);
        setPhone(foundClient.phone);
      }
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedClient = { name, email, phone };

    if (client) {
      updateClient(client.id, updatedClient);
      alert("Cliente atualizado com sucesso!");
    } else {
      registerClient(name, email, phone);
      alert("Cadastro efetuado com sucesso!");
    }

  };

  return (
    <div className="form-container">
      <h1>{client ? "Editar Cliente" : "Cadastrar Cliente"}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="clientName">Nome: </label>
          <input
            type="text"
            name="clientName"
            id="clientName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientEmail">Email: </label>
          <input
            type="email"
            name="clientEmail"
            id="clientEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientPhone">Telefone: </label>
          <input
            type="tel"
            name="clientPhone"
            id="clientPhone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="addBtn">
          {client ? "Actualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

RegisterClient.propTypes = {
  client: PropTypes.object,
};
