export const initialState = {
    contacts: [],
};

export const contactReducer = (store, action) => {
    switch (action.type) {
        case "SET_CONTACTS":
            return { ...store, contacts: action.payload };
        case "ADD_CONTACT":
            return { ...store, contacts: [...store.contacts, action.payload] };
        case "DELETE_CONTACT":
            return { ...store, contacts: store.contacts.filter(c => c.id !== action.payload) };
        case "UPDATE_CONTACT":
            return {
                ...store,
                contacts: store.contacts.map(c =>
                    c.id === action.payload.id ? action.payload : c
                )
            };
        default:
            return store;
    }
};