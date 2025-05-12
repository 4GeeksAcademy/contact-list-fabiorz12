const API_URL = "https://playground.4geeks.com/contact";

export const getContacts = async () => {
    const res = await fetch(`${API_URL}/agendas/grimorio/contacts`);
    return await res.json();
};

export const addContact = async (contact) => {
    const res = await fetch(`${API_URL}/agendas/grimorio/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, mi_agenda: "mi_agenda" })
    });
    if (!res.ok) {
        throw new Error("Error al agregar el contacto");
    }
};

export const deleteContact = async (id) => {
  await fetch(`${API_URL}/agendas/grimorio/contacts/${id}`, {
    method: "DELETE"
  });
};

export const updateContact = async (contact) => {
  const res = await fetch(`${API_URL}/agendas/grimorio/${contact.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
  return await res.json();
};