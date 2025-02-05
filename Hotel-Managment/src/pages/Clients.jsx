import useBookingContext from "../hook/useBookingContext";
import person_icon from "../../public/person_icon.png";
import { Link } from "react-router-dom";

export default function Clients() {
  const { clients, deleteClient } = useBookingContext();

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Acções</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <img
                    src={person_icon}
                    alt="person_icon"
                    className="person_icon"
                  />
                </td>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td className="actionsBtn">
                  <button
                    className="deleteBtn"
                    onClick={() => {
                      deleteClient(client.id);
                      alert("Cliente excluído com sucesso!!");
                    }}
                  >
                    Excluir
                  </button>
                  <Link to={`editClient/${client.id}`}>
                    <button className="updateBtn">Actualizar</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <p>Nenhum Cliente Cadastrado</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
