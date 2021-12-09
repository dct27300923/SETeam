import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CommonHead from './CommonHead';

const Layout = ({ children }) => (
	<>
		<CommonHead />
		<Header />
		{children}
		<Footer />
	</>
);

export default Layout;