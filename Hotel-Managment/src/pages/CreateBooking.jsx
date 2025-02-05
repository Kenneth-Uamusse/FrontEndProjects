import { useState, useEffect } from "react";
import useBookingContext from "../hook/useBookingContext";

export default function CreateBooking() {
  const { clients, rooms, createBooking, availableRoom } = useBookingContext();
  const [clientName, setClientName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);

  // Função para filtrar os quartos disponíveis com base nas datas de check-in e check-out
  useEffect(() => {
    if (checkIn && checkOut) {
      const filteredRooms = rooms.filter((room) =>
        availableRoom(room.id, checkIn, checkOut)
      );
      setAvailableRooms(filteredRooms);
    }
  }, [checkIn, checkOut, rooms, availableRoom]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedClient = clients.find((client) => client.name === clientName);
    if (!selectedClient) {
      alert("Por favor, selecione um cliente válido.");
      return;
    }

    const selectedRoom = availableRooms.find(
      (room) => room.number.toString() === roomNumber
    );
    if (!selectedRoom) {
      alert("Por favor, selecione um quarto disponível.");
      return; 
    }
   
    createBooking(selectedClient.id, selectedRoom.id, checkIn, checkOut);
    alert("Reserva efectuada com sucesso!!");

    setClientName("");
    setRoomNumber("");
    setCheckIn("");
    setCheckOut("");
  };

  return (
    <div className="form-container">
      <h1>Preencha os campos correctamente</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            id="clientName"
            name="clientName"
            list="clientsList"
            placeholder="Seleccione ou insira o nome do cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            autoComplete="off"
            required
          />
          <datalist id="clientsList">
            {clients.length > 0 ? (
              clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))
            ) : (
              <option value="Nenhum cliente cadastrado">
                Nenhum cliente cadastrado
              </option>
            )}
          </datalist>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="roomNumber"
            id="roomNumber"
            placeholder="Seleccione ou insira o número do quarto"
            list="roomsList"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            autoComplete="off"
            required
          />
          <datalist id="roomsList">
            {availableRooms.length > 0 ? (
              availableRooms.map((room) => (
                <option key={room.id} value={room.number}>
                  {room.number} - {room.type}
                </option>
              ))
            ) : (
              <option value="Nenhum quarto disponível">
                Nenhum quarto disponível
              </option>
            )}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="checkIn">Entrada:</label>
          <input
            type="date"
            name="checkIn"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOut">Saída:</label>
          <input
            type="date"
            name="checkOut"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="addBtn">
          Reservar
        </button>
      </form>
    </div>
  );
}
