import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import ErrorNotice from '../../ErrorNotice'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a rel="noopener noreferrer" target="_blank" color="inherit" href="https://smdurjoy.com">
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [ name, setName ] = useState()
  const [ username, setUsername ] = useState()
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ passwordCheck, setPasswordCheck ] = useState()
  const [ error, setError ] = useState()
  const [ buttonText, setButtonText ] = useState('Sign in')
  const [ isDisabled, setIsDisabled ] = useState(false)

  const { setUserData } = useContext(UserContext)
  const history = useHistory()

  const [visible, setVisible] = useState(true)
  const onDismiss = () => {
    setVisible(false)
    setError(undefined)
  }

  const onSignup = async (e) => {
    e.preventDefault()
    setButtonText('Signing up ...')
    setIsDisabled(true)

    try {
      const newUser = { name, username, email, password, passwordCheck }
      await Axios.post(`${url}/register`, newUser)
      
      const loginRes = await Axios.post(`${url}/login`, {
        username,
        password
      })

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      })
      localStorage.setItem('x-auth-token', loginRes.data.token)
      history.push('/')

    } catch(err) {
      err.response.data.msg && setError(err.response.data.msg)
      setVisible(true)
      setButtonText('Sign in')
      setIsDisabled(false)
    }
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
          Sign up
        </Typography>
        { error && (
          <ErrorNotice message={error} visible={visible} onDismiss={onDismiss}/> 
        )}
        <form className={classes.form} onSubmit={onSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fullname"
                variant="outlined"
                required
                fullWidth
                id="fullname"
                label="Display Name"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid> 
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confrim Password"
                type="password"
                id="confirmPassword"
                onChange={e => setPasswordCheck(e.target.value)}
              />
            </Grid> 
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} mb={2}>
        <Copyright />
      </Box>
    </Container>
  );
}