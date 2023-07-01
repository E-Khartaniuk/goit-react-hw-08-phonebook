import Notiflix from 'notiflix';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginThunk } from 'redux/auth/thunk';

export default function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChenge = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(email, password);

    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        Notiflix.Notify.success('Login success');
      })
      .catch(() => {
        Notiflix.Notify.failure('Login error');
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      ></Box>
      <h3>Login</h3>
      <form action="submit" autoComplete="on" onSubmit={handleSubmit}>
        <h4>email</h4>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          autoComplete="email"
          name="email"
          onChange={handleChenge}
          value={email}
        />
        <h4>password</h4>
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          type="text"
          name="password"
          onChange={handleChenge}
          value={password}
        />
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">
            registration
          </Button>
        </Stack>
      </form>
    </>
  );
}
