/** @jsxImportSource @emotion/react */

import Layout from '../components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { css, jsx }from '@emotion/react';
import { API } from '../utils/api';
import { useRouter } from 'next/router';
import { login } from '../utils/api-tools';
import { validate } from '../utils/token';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!window) return;
    if(!email || !password) {
      alert('fill all fields.');
      return;
    }
    try {
      const res = await login(email, password);
      const { StudentOrProfessor } = res;
      alert("Login Success");
      if(StudentOrProfessor === 'P') {
        router.push('/LectureUploadPage');
      } else {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (validate()) {
      router.push('/');
      return;
    }
  }, []);

  return (
    <Layout>
      <div css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 520px;
        height: 600px;
        margin: 0 auto;
        margin-top: 100px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #4e73df;
      `}>
        <h3>로그인</h3>
        <form className="user">
          <div className="form-group">
              <input type="email" className="form-control form-control-user"
                  id="exampleInputEmail" aria-describedby="emailHelp"
                  placeholder="Enter Email Address..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="form-group">
              <input type="password" className="form-control form-control-user"
                  id="exampleInputPassword" placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}    
              />
          </div>
          <a className="btn btn-primary btn-user btn-block" onClick={handleLogin}>
              Login
          </a>
      </form>
        </div>
    </Layout>
  )
}
