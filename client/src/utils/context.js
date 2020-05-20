import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

//function to pass to useReducer()
const reducer = (state, action) => {

  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.user,
        test: action.test
      };
    default:
      console.log('STATE in reducer: ', state);
      return state;
  }
};

const StoreProvider = ({ ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    providerConnected: true,
  });
  return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };