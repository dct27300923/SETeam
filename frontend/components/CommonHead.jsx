import Head from 'next/head';

const CommonHead = ({ children }) => (
	<>
		<Head>
			<link rel="stylesheet" href="/css/sb-admin-2.css" />
			<script async src="/js/sb-admin-2.js"></script>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
			/>    		
			<link
        		href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        		rel="stylesheet" />
		</Head>
	</>
);

export default CommonHead;