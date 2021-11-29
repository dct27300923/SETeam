import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = ({ children }) => (
	<>
		<Head>
			<link rel="stylesheet" href="/css/sb-admin-2.css" />
			<script src="/js/sb-admin-2.js"></script>
			<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
    		<link
        		href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        		rel="stylesheet" />
		</Head>
		<Header />
		{children}
		<Footer />
	</>
);

export default Layout;