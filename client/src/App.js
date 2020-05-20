import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { StoreProvider } from './utils/context';
import Main from "./pages/main";
import SignInForm from './components/SignInForm';
import SignUpForm from "./components/SignUpForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2a9d8f'
    },
    secondary: {
      main: '#f4a261'
    }
  }
})

function App() {
  return (
   <Router>
     <StoreProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path = "/login">
            <SignInForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
            <Route path="/">
              <Main />
            </Route>
        </Switch>
      </ThemeProvider>
      </StoreProvider>
   </Router>
  );
}

export default App;
