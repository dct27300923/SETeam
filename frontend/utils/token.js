import jwt from 'jsonwebtoken';

export const getToken = () => {
	if(!window) return;
	return window.localStorage.getItem('token');
}

export const setToken = (token) => {
	if(!window) return;
	window.localStorage.setItem('token', token);
}

export const destroyToken = () => {
	if(!window) return;
	window.localStorage.removeItem('token');
}

export const decode = (token) => {
	if(!token) return;
	return jwt.decode(token);
}

export const validate = () => {
	const token = getToken();
	if(!token) return;
	const decoded = decode(token);
	if(!decoded) {
		return false;
	} else {
		return true;
	}
}

export const isStudent = () => {
	const token = getToken();
	if(!token) return;
	const decoded = decode(token);
	if(!decoded) {
		return false;
	} else {
		return decoded.StudentOrProfessor === "P" ? false : true;
	}
}