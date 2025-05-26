import { createContext, useReducer, useContext } from "react";
import { contactReducer, initialState } from "./store";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [store, dispatch] = useReducer(contactReducer, initialState);

    return (
        <ContactContext.Provider value={{ store, dispatch }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => useContext(ContactContext);