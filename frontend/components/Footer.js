/** @jsxImportSource @emotion/react */

import Layout from '../components/Layout'
import Link from 'next/link'
import { css, jsx }from '@emotion/react';


const Footer = () => {
	return (
		<div className="footer" css={css`
			background-color: #f5f5f5;
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
		`}>
			소프트웨어 공학 온라인 강의실 시스템
		</div>
	)
}

export default Footer;