import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from '../../utils/API';
import { useStoreContext } from '../../utils/context';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/garrettmroberts">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  nameInputLeft: {
    marginRight: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpForm() {
  const classes = useStyles();
  const [state, dispatch] = useState({
    redirect: false
  })
  const [globalState, globalDispatch] = useStoreContext();

  const handleChange = e => {
    dispatch({...state, [e.target.id]: e.target.value})
  }

  async function handleSumbit(e) {
    e.preventDefault();

    if (state.password !== state.password2 || state.password === undefined || state.password.length === 0 ) {
      return;
    };

    if (state.firstName === undefined || state.firstName.length === 0) {
      return;
    };

    if (state.lastName === undefined || state.lastName.length === 0) {
      return;
    };

    const emailList = await API.getUsers();
    if (emailList.data.includes(state.email)) {
      dispatch({...state, validEmail: false});
      return;
    };

    const userData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password
    };

    API.createUser(userData)
    .then((res) => {
      globalDispatch({type: 'login', payload: res.data});
      dispatch({...state, validEmail: true, redirect: true});
    });
  };

  if (state.redirect) {
    return <Redirect to="/" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onChange={handleChange}>
          <TextField
            variant="outlined"
            className={classes.nameInputLeft}
            margin="normal"
            style={{width: '48%', marginRight: '2%'}}
            required
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
          />
          <TextField
            variant="outlined"
            className={classes.nameInputs}
            margin="normal"
            style={{ width: '48%', marginLeft: '2%' }}
            required
            id="lastName"
            label="Last Name"
            name="lastName"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            error = {state.email !== undefined
              && !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(state.email)
            ? true : false}
            helperText= {state.email !== undefined
              && !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(state.email)
              ? 'Invalid email.' : ''}
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={state.password !== undefined
              && state.password.length < 8
              ? true : false}
            helperText={state.password !== undefined
              && state.password.length < 8
              ? 'Password is too short.' : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            error={state.password !== undefined
            && state.password2 !== undefined
            && state.password !== state.password2
            ? true : false}
            helperText={state.password !== undefined
              && state.password2 !== undefined
              && state.password !== state.password2
              ? "Passwords don't match." : ''}
          />
          <Typography variant="body2" component="h2">{state.validEmail === false ? 'That email is associated with another account.  Try again?' : ''}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSumbit}
          >
            Sign In
          </Button>
        </form>
        <Link href="/login" variant="body2">
          {"Already have an account? Sign In"}
        </Link>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};