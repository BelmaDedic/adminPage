import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:3000";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © AirsoftApp'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const storedUserJSONString = localStorage.getItem('user');
  const user = storedUserJSONString ? JSON.parse(storedUserJSONString) : null;

  React.useEffect(() => {
    if(user !== null){
      navigate('/AdminDashboard')
    }
  },[])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggingError, setUserLoggingError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const dataFetch = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let Fdata = await dataFetch.json();
    const userJSONString = JSON.stringify(Fdata);
  localStorage.setItem('user', userJSONString);
    navigate('/AdminDashboard')

    if (Fdata === "User not found") {
      Fdata = false;
      setUserLoggingError(true);
      navigate('/');
    }
  };

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LoginIcon sx={{ fontSize: '30px' }} />

            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                sx={{ input: { color: 'white', borderColor: 'white', outline: 'white solid 1px' } }}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
                type='text'
                error={userLoggingError}
                inputProps={{ maxLength: 20, minLength: 5 }}
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                sx={{ input: { color: 'white', borderColor: 'white', outline: 'white solid 1px' } }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type='password'
                autoComplete="off"
                inputProps={{ maxLength: 20, minLength: 8 }}
                error={userLoggingError}
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              {userLoggingError && <div style={{ color: "red" }}>* Korisničko ime ili lozinka koju ste unijeli je pogrešna!</div>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, color: 'white', cursor: 'default' }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}