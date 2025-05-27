import { useEffect } from "react";

const API_URL = "https://playground.4geeks.com/contact";
const USERNAME = "grimorio";

export const useCreateAgenda = async() => {
  useEffect(() => {
    const lastChecked = localStorage.getItem("lastAgendaCheck");
    const now = new Date();
    // No necesitas hacer nada aquí, el useEffect se ejecuta automáticamente cuando el hook se usa en un componente.
    // Si no hay registro anterior o pasaron más de 24 horas:
    if (!lastChecked || now - new Date(lastChecked) > 24 * 60 * 60 * 1000) {
      // Verificar si la agenda ya existe
      fetch(`${API_URL}/agenda/${USERNAME}`)
        .then((res) => {
          if (res.status === 404) {
            // Si no existe, la creamos
            return fetch(`${API_URL}/agenda`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ agenda_slug: USERNAME }),
            });
          }
        })
        .then(() => {
          // Guardamos la fecha del último chequeo
          localStorage.setItem("lastAgendaCheck", now.toISOString());
        })
        .catch((err) => {
          console.error("Error creando/verificando la agenda:", err);
        });
    }
  }, []);
};

export const getContacts = async () => {
    const res = await fetch(`${API_URL}/agendas/grimorio/contacts`);
    return await res.json();
};

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
    const res = await fetch(`${API_URL}/agenda/grimorio/contact/${id}`, { 
        method: "DELETE"
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error deleting contact: ${res.status} - ${JSON.stringify(errorData)}`);
    }
};

export const updateContact = async (contact) => {
      const res = await fetch(`${API_URL}/agenda/grimorio/contact/${contact.id}`, { 
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