import React from 'react';
import { Redirect } from 'react-router-dom';
import { useStoreContext } from '../utils/context';

const Main = () => {
  const [state, dispatch] = useStoreContext();

  if (state.isLoggedIn === false) {
    return(
      <Redirect to='/signup' />
    )
  }

  return(<h1>Test</h1>)
}

export default Main;