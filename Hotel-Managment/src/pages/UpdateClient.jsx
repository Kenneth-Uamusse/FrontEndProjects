import { useNavigate, useParams } from "react-router-dom"
import useBookingContext from "../hook/useBookingContext"
import { useState, useEffect } from "react"

export default function UpdateClient(){
    const {id} = useParams()
    const {clients, updateClient} = useBookingContext()
    const [currentClient, setCurrentClientes] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const clientToEdit = clients.find((client) => client.id === id); 
        if (clientToEdit) {
          setCurrentClientes(clientToEdit);
        }
      }, [id, items]);
    
      const handleUpdate = (updatedClient) => {
        updateClient(id, updatedClient);
        
        alert("Cliente Actualizado com Sucesso!!");
        navigate("/clients");
      };

    return(
        <>
            {currentClient ? (
                
            ): (
                <p>Carregando...</p>
            )}
        </>
    )
}