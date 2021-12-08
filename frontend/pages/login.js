import Layout from '../components/Layout'
import Link from 'next/link'
import { css, jsx }from '@emotion/react';
import { API } from '../utils/api';
import { useRouter } from 'next/router';
import { login } from '../utils/api-tools';

export default function Login() {
  const router = useRouter();
  const handleLogin = async () => {
    if (!window) return;
    try {
      const res = await login('prod@gmail.com', '123');
      alert("Login Success");
      router.push('/LectureUploadPage');
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
