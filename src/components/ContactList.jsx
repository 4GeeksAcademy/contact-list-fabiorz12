import { useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import { getContacts, deleteContact } from "../context/fetch";
import { Link } from "react-router-dom";

const ContactList = () => {
  const { state, dispatch } = useContacts();

  useEffect(() => {
    getContacts().then(data => dispatch({ type: "SET_CONTACTS", payload: data }));
  }, []);

  const handleDelete = async (id) => {
    await deleteContact(id);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  return (
    <div>
      <h2>Lista de Contactos</h2>
      <Link to="/add">Agregar Contacto</Link>
      <ul>
        {Array.isArray(state.contacts) && state.contacts.length > 0 ? (
          state.contacts.map(contact => (
            <li key={contact.id}>
              {contact.full_name} - {contact.email} - {contact.phone}
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