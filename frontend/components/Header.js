/** @jsxImportSource @emotion/react */
import { css, jsx }from '@emotion/react';
import Layout from '../components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getToken, decode, destroyToken } from '../utils/token';
import { useRouter } from 'next/router';


const Header = () => {
	const [userId, setUserId] = useState('');
	const [role, setRole] = useState('');
	const router = useRouter();
	const handleLogout = () => {
		destroyToken();
		router.push('/login');	
	}

	useEffect(() => {
		const token = getToken();
		if (token) {
			const { userId, StudentOrProfessor } = decode(token);
			if(StudentOrProfessor === 'P') {
				setRole('Professor');
			} else {
				setRole('Student');
			}
			setUserId(userId);
		}
	}, []);
	return (
		<div className="footer" css={css`
			background-color: #031765;
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: center;
			align-items: center;
		`}>
			소프트웨어 공학 온라인 강의실 시스템
			{userId && 
			<span
			  onClick={handleLogout}
			  css={css`
			    cursor: pointer;
				color: #f2f;
				margin-left: 10px;
			`}>Logged In: {userId} ({role})
			</span>}
		</div>
	)
}

export default Header;