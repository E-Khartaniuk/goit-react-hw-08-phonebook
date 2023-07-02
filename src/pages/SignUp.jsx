import { signUp } from 'components/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    signUp({
      name,
      email,
      password,
    }).then(() => {
      navigate('/login');
    });
  };

  const handleChenge = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <h3>Registration</h3>
      <form action="submit" autoComplete="on" onSubmit={handleSubmit}>
        <h4>name</h4>
        <input type="text" name="name" onChange={handleChenge} value={name} />
        <h4>email</h4>
        <input
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
