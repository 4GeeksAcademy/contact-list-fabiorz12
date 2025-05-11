import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import { addContact, updateContact, } from "../context/fetch";

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useContacts();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "" });

  useEffect(() => {
    if (id) {
      const existing = state.contacts.find(c => c.id === parseInt(id));
      if (existing) setForm(existing);
    }
  }, [id, state.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    if (id) {
      const updated = await updateContact(form);
      dispatch({ type: "UPDATE_CONTACT", payload: updated });
    } else {
      const created = await addContact(form);
      dispatch({ type: "ADD_CONTACT", payload: created });
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Nombre" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
      <input name="adress" value={form.adress} onChange={handleChange} placeholder="Direccion" />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ContactForm;