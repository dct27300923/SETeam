export class UserResponse {
	user_id;
	create_at;
	email;
	st;
	major;
}

export class LectureResponse {
	lecture_id;
	professor = null;
	create_at;
	title;
}

export class LectureInfoResponse {
	lecture_info_id;
	create_at;
	week;
	attendance_need_sec;
	lecture = null;
}

export class LectureRegistrationResponse {
	lecture_reg_id;
	register_at;
	user = null;
	lecture = null;
}

export class LectureAttendanceResponse {
	lecture_attendance_id;
	create_at;
	attendance_sec;
	lecturRegistratiion = null;
	lectureInfo = null;
}

export class LectureResourseResponse {
	resource_uri;
	create_at;
	type;
	title;
	lectureInfo = null;
}

export class AssignmentResponse {
	assignment_id;
	create_at;
	title;
	content;
	lectureInfo = null;
	deadline_at;
}

export class BookmarkResponse {
	bookmark_id;
	create_at;
	user = null;
	lectureInfo = null;
	bookmark_sec;
	content;
}

/*
  dummay data for test
*/

export const dummyUser = {
	user_id: 2017920001,
	create_at: new Date(),
	email: 'test@uos.ac.kr',
	st: '컴퓨터공학과',
	major: '컴퓨터공학과'
}

export const dummyLecture = {
	lecture_id: 1,
	professor: dummyUser,
	create_at: new Date(),
	title: '소프트웨어공학'
}

export const dummyLectureInfo = {
	lecture_info_id: 1,
	create_at: new Date(),
	week: 1,
	attendance_need_sec: 60,
	lecture: dummyLecture
}

export const dummyLectureRegistration = {
	lecture_reg_id: 1,
	register_at: new Date(),
	user: dummyUser,
	lecture: dummyLecture
}

export const dummyLectureAttendance = {
	lecture_attendance_id: 1,
	create_at: new Date(),
	attendance_sec: 10,
	lecturRegistratiion: dummyLectureRegistration,
	lectureInfo: dummyLectureInfo
}

export const dummyLectureResourse = {
	resource_uri: './test.mp4',
	create_at: new Date(),
	type: 'video/mp4',
	title: '소프트웨어공학',
	lectureInfo: dummyLectureInfo
}

export const dummyAssignment = {
	assignment_id: 1,
	create_at: new Date(),
	title: "과제1",
	content: "안녕하세요",
	lectureInfo: dummyLectureInfo,
	deadline_at: new Date()
}

export class API {
	constructor(token = null) {
	  this.url = 'http://13.125.246.198';
	  if(window) {
		this.token = window.localStorage.getItem('token');
	  } else {
		this.token = token;
	  }
	}
  
	get(url) {
	  return fetch(this.url + url, {
		  headers: {
			  'x-access-token': this.token
		  }
	  })
		.then(response => response.json())
		.catch(error => console.log(error));
	}
  
	post(url, data, isFormData = false) {
	  let body = JSON.stringify(data);
	  if(isFormData) {
		let fd = new FormData();
		Object.keys(data).forEach(key => {
			fd.append(key, data[key]);
		});
		body = fd;
	  }

	  const headers = {
		  'x-access-token': this.token
	  }
	  if(!isFormData) {
		headers['Content-Type'] = 'application/json';
	  }
	  return fetch(this.url + url, {
		method: 'POST',
		headers,
		body: body,
	  })
		.then(response => response.json())
		.catch(error => console.log(error));
	}

	patch(url, data) {
	  return fetch(this.url + url, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		  'x-access-token': this.token
		},
		body: JSON.stringify(data)
	  })
		.then(response => response.json())
		.catch(error => console.log(error));
	}

	delete(url) {
	  return fetch(this.url + url, {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		  'x-access-token': this.token
		}
	  })
		.then(response => response.json())
		.catch(error => console.log(error));
	}
}