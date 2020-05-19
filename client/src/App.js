import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
     <ThemeProvider theme={theme}>
      <Switch>
        <Route path = "/login">
          <SignInForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
      </Switch>
    </ThemeProvider>
   </Router>
  );
}

export default App;
