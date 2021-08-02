import React, {useState} from 'react';
import { UserToken } from '../hooks/useToken';

interface LoginProps {
  setToken: (userToken: UserToken) => void
}

interface Credentials {
  email: string,
  password: string,
}

async function loginUser(credentials: Credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'applciation/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}

export default function Login(props: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await loginUser({
      email, password,
    });
    props.setToken(token);
  }
  return (
    <div className='loginWrapper'>
      <h1>Seja Bem-vindo!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>E-mail</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Senha</p>
          <input type='password' onChange={e => setPassword(e.target.value)} />
        </label>
        <div><button type='submit'>Entrar</button></div>
      </form>
    </div>
  )
}