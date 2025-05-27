const API_URL = "https://playground.4geeks.com/contact";



export const addContact = async (contact) => {
    const res = await fetch(`${API_URL}/agendas/grimorio/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: "grimorio" }) 
    });
    if (!res.ok) {
        const errorData = await res.json(); 
        throw new Error(`Error adding contact: ${res.status} - ${JSON.stringify(errorData)}`);
    }
    return await res.json();
};

export const deleteContact = async (id) => {
    const res = await fetch(`https://playground.4geeks.com/contact/agendas/grimorio/contacts/${id}`, { 
        method: "DELETE"
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error deleting contact: ${res.status} - ${JSON.stringify(errorData)}`);
    }
};

export const updateContact = async (contact) => {
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/grimorio/contacts/${contact.id}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error updating contact: ${res.status} - ${JSON.stringify(errorData)}`);
    }
    return await res.json();
};