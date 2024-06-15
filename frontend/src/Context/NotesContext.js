import { createContext, useReducer } from "react";

// Create the context
export const NotesContext = createContext();

// Create a provider component

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "CREATE_NOTE":
      return {
        notes: [action.payload, ...state.notes],
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((n) => n._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, { notes: null });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
