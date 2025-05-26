import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import { addContact, getContacts, updateContact, } from "../context/fetch";

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { store, dispatch } = useContacts();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const existing = store.contacts.find(c => c.id === parseInt(id));
      if (existing) {
        setForm(existing);
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const updated = await updateContact(form);
        dispatch({ type: "UPDATE_CONTACT", payload: updated });
      } else {
        const created = await addContact(form);  // Llamada a la API para agregar contacto
        dispatch({ type: "ADD_CONTACT", payload: created }); // Despacho de la acción ADD_CONTACT con el nuevo contacto
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error al guardar el contacto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 text-center bg-light p-5 rounded">
      <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
      <p className="lead">Llena el formulario para {id ? "editar" : "agregar"} un contacto</p>
      <form onSubmit={handleSubmit}>
        <input className="w-100 mb-2" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" /><br />
        <input className="w-100 mb-2" name="email" value={form.email} onChange={handleChange} placeholder="Correo" /><br />
        <input className="w-100 mb-2" name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" /><br />
        <input className="w-100 mb-2" name="address" value={form.address} onChange={handleChange} placeholder="Direccion" /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
