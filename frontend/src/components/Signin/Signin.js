import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import brandLogo from '../../assets/images/brang-logo.png';
import Axios from 'axios'
import url from '../../BackendUrl'
import { useHistory, Redirect } from 'react-router-dom'
import UserContext from '../../context/UserContext'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" rel="noopener noreferrer" href="https://smdurjoy.com">
        instaSohor
      </a>{' '}
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
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const [ username, setUsername ] = useState()
  const [ password, setPassword ] = useState()

  const { setUserData } = useContext(UserContext)
  const history = useHistory()

  const onSignin = async (e) => {
    e.preventDefault()
    const newUser = { username, password }
    
    const loginRes = await Axios.post(`${url}/login`, newUser)

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    })
    localStorage.setItem('x-auth-token', loginRes.data.token)
    history.push('/')
  }

  const classes = useStyles();

  const token = localStorage.getItem('x-auth-token');

  if (token) {
      return (
          <Redirect to="/" />
      )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className="mb-1">
            <img title="instaSohor" style={{width:"30px"}} src={brandLogo} alt="homepage" className="dark-logo" />
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSignin}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="lname"
            onChange={e => setUsername(e.target.value)}
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
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}