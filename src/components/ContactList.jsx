import { useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import { deleteContact, } from "../context/fetch";
import { Link } from "react-router-dom";

const ContactList = () => {
  const { store, dispatch } = useContacts();
  const contacts = Array.isArray(store.contacts) ? store.contacts : [];
  
  useEffect(() => {
    fetch ('https://playground.4geeks.com/contact/agendas/grimorio/contacts',

      {method: "GET", headers: {"Content-Type": "application/json"}}
    )
      .then((response) => response.json())
      .then(data =>{
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
      })},[])
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
        {contacts.length> 0 ? (
          contacts.map(contact => (
            <li key={contact.id}>
              <h3>{contact.name}</h3>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
              <Link to={`/edit/${contact.id}`}>Editar</Link>
              <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <h3 className="mt-5">
            No hay contactos agregados, dale click al boton de agregar contactos para ingresar tu primer contacto.
          </h3>
        )}
      </ul>
    </div>
  );
};

export default ContactList;


// const { store, dispatch } = useGlobalReducer()

//     const contacts = store.contacts
//     const slug = store.slug
// {
//                     contacts.length > 0 ?

//                         contacts.map((contact) => {
//                             return (
//                                 <Contact key={contact.id} contact={contact || ''} />
//                             )
//                         }) : <h3 className="mt-5">No hay contactos agregados en la {slug}, dale click al boton de agregar contactos para ingresar tu primer contacto.</h3>
//                 }
