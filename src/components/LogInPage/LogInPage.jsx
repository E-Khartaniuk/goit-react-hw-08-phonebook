// import { logIn } from 'components/api/auth';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from 'redux/auth/thunk';

export default function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.access_token);

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
        navigate('/contacts');
      })
      .catch(error => {
        Notiflix.Notify.failure('Login error');
      });
  };

  // useEffect(() => {
  //   isAuth && navigate('/contacts');
  //  }, [isAuth]);

  // if (!isAuth) {
  //   return;
  // }

  return (
    <>
      <h3>Login</h3>
      <form action="submit" autoComplete="on" onSubmit={handleSubmit}>
        <h4>email</h4>
        <input
          autoComplete="email"
          type="email"
          name="email"
          onChange={handleChenge}
          value={email}
        />
        <h4>password</h4>
        <input
          type="text"
          name="password"
          onChange={handleChenge}
          value={password}
        />
        <button type="submit">registration</button>
      </form>
    </>
  );
}
