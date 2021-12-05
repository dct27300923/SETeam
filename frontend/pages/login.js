import Layout from '../components/Layout'
import Link from 'next/link'
import { css, jsx }from '@emotion/react';
import { API } from '../utils/api';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const handleLogin = async () => {
    if (!window) return;
    try {
      const res = await new API().post('/login', {
        email: 'abc@gmail.com',
        password: '1234'
      })
      localStorage.setItem('token', res.result.jwt);
      alert("Login Success");
      router.push('/');
    } catch (e) {
      console.error(e);
      alert("ERROR HANDLER");
    }
  }

  return (
    <Layout>
      <h1>Login</h1>
      <button onClick={handleLogin} className="rounded-circle border-0">Click to Login</button>
    </Layout>
  )
}
