import { useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import { getContacts, deleteContact } from "../context/fetch";
import { Link } from "react-router-dom";

const ContactList = () => {
  const { state, dispatch } = useContacts();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts();
        dispatch({ type: "SET_CONTACTS", payload: data });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    loadContacts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mt-5 mb-5 text-center bg-light p-5 rounded">
      <h1 className="text-center">Agenda de Contactos</h1>
      <Link to="/add">Agregar Contacto</Link>
      <ul>
        {Array.isArray(state.contacts) && state.contacts.length > 0 ? (
          state.contacts.map(contact => (
            console.log("contact", contact),
            <li key={contact.id}>
              {(contact.name || contact.full_name || "Sin nombre")} -
              {(contact.email || "Sin email")} -
              {(contact.phone || "Sin teléfono")} -
              {(contact.address || contact.adress || "Sin dirección")}
              {/* {contact.name} - {contact.email} - {contact.phone} - {contact.address} */}
              <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
              <Link to={`/edit/${contact.id}`}>Editar</Link>
            </li>
          ))
        ) : (
          <li>No hay contactos disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default ContactList;
