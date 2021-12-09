import { API } from "./api"
import { getToken, setToken, validate, decode } from "./token";

export const login = async (id, password) => {
	try {
		const res = await new API().post("/login", {
			email: id,
			password: password
		});
		setToken(res.result.jwt);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to Login // ERROR HANDLER");
		throw e;
	}
}

export const getMainData = async () => {
	if(!validate()) return;
	const token = decode(getToken());

	const { userId } = token;
	try {
		const res = await new API().get(`/main/${userId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get main data // ERROR HANDLER");
		throw e;
	}
}

export const uploadLecture = async (lectureId, week, file, title) => {
	if(!validate()) return;
	try {
		const res = await new API().post(`/lecture/${lectureId}/${week}`, {
			video: file,
			title: title
		}, true);
		console.log("res: "+res);
		console.log("res.result: "+res.result);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to upload lecture // ERROR HANDLER");
		throw e;
	}
}

export const getLectureResource = async (lectureResourceId) => {
	if(!validate()) return;
	try {
		const res = await new API().get(`/lecture/${lectureResourceId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get lecture resource // ERROR HANDLER");
		throw e;
	}
}

export const PatchLectureResource = async (lectureResourceId) => {
	if(!validate()) return;
	try {
		const res = await new API().patch(`/lecture/${lectureResourceId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to patch lecture resource // ERROR HANDLER");
		throw e;
	}
}

export const CreateBookmark = async (lectureResourceId, bookmarkSec, content) => {
	if(!validate()) return;
	try {
		const res = await new API().post(`/bookmark/${lectureResourceId}`, {
			bookmarkSec: bookmarkSec,
			content: content
		});
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to create bookmark // ERROR HANDLER");
		throw e;
	}
}

export const removeBookmark = async (bookmarkId) => {
	if(!validate()) return;
	try {
		const res = await new API().delete(`/bookmark/${bookmarkId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to remove bookmark // ERROR HANDLER");
		throw e;
	}
}

export const getLectureDetail = async (lectureId) => {
	if(!validate()) return;
	try {
		const res = await new API().get(`/lecture-detail/${lectureId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get lecture detail // ERROR HANDLER");
		throw e;
	}
}

export const getBookmarkByLectureId = async (lectureId) => {
	if(!validate()) return;
	try {
		const res = await new API().get(`/bookmark/${lectureId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get bookmark // ERROR HANDLER");
		throw e;
	}
}