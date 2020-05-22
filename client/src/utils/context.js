import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

//function to pass to useReducer()
const reducer = (state, action) => {

  switch (action.type) {
    case 'login':
      console.log('STATE: ', state);
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload._id,
      };
    default:
      console.log('STATE in reducer: ', state);
      return state;
  }
};

const StoreProvider = ({ ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false
  });
  return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };