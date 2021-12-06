import { API } from "./api"
import { getToken, setToken, validate } from "./token";

export const login = async (id, password) => {
	try {
		const res = new API().post("/login", {
			email: id,
			password: password
		});
		setToken(res.result.jwt);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to Login // ERROR HANDLER");
	}
}

export const getMainData = async () => {
	if(!validate()) return;
	const token = decode(getToken());

	const { userId } = token;
	try {
		const res = new API().get(`/main/${userId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get main data // ERROR HANDLER");
	}
}

export const uploadLecture = async (lectureInfoId, file, title) => {
	if(!validate()) return;
	try {
		const res = new API().post(`/lecture/${lectureInfoId}`, {
			video: file,
			title: title
		}, true);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to upload lecture // ERROR HANDLER");
	}
}

export const getLectureResource = async (lectureResourceId) => {
	if(!validate()) return;
	try {
		const res = new API().get(`/lecture/${lectureResourceId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get lecture resource // ERROR HANDLER");
	}
}

export const PatchLectureResource = async (lectureResourceId) => {
	if(!validate()) return;
	try {
		const res = new API().patch(`/lecture/${lectureResourceId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to patch lecture resource // ERROR HANDLER");
	}
}

export const CreateBookmark = async (lectureResourceId, bookmarkSec, content) => {
	if(!validate()) return;
	try {
		const res = new API().post(`/bookmark/${lectureResourceId}`, {
			bookmarkSec: bookmarkSec,
			content: content
		});
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to create bookmark // ERROR HANDLER");
	}
}

export const removeBookmark = async (bookmarkId) => {
	if(!validate()) return;
	try {
		const res = new API().delete(`/bookmark/${bookmarkId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to remove bookmark // ERROR HANDLER");
	}
}

export const getLectureDetail = async (lectureId) => {
	if(!validate()) return;
	try {
		const res = new API().get(`/lecture-detail/${lectureId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get lecture detail // ERROR HANDLER");
	}
}

export const getBookmarkByLectureId = async (lectureId) => {
	if(!validate()) return;
	try {
		const res = new API().get(`/bookmark/${lectureId}`);
		return res.result;
	} catch (e) {
		console.error(e);
		alert("Failed to get bookmark // ERROR HANDLER");
	}
}