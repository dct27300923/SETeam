import jwt from 'jsonwebtoken';

export const getToken = () => {
	if(!window) return;
	return window.localStorage.getItem('token');
}

export const destroyToken = () => {
	if(!window) return;
	window.localStorage.removeItem('token');
}

export const decode = (token) => {
	if(!token) return;
	return jwt.decode(token);
}