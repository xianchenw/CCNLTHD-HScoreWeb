import axios from 'axios';
import cookie from 'react-cookies';

export let endpoints = {
    'subjects': '/subjects/',
    'semester-subjects': '/subjects/scores/',
    'login': '/api/token/',
    'subjects': '/subjects/',
    'semesters': '/semesters/',
    'timetables':'/users/timetables/',
    'current-user': '/users/current-user/',
    'forums': '/forums/',
    'forums-detail': (forumId) => `/forums/${forumId}/`,
    'forums-like': (forumId) => `/forums/${forumId}/like/`,
    'forum-comments': (forumId) => `/forums/${forumId}/comments/`,
    'complain-score': (scoreId) => `/scores/${scoreId}/complain/`,
    'students-user': '/students/user/',
    'student-register': (studentId) => `/students/${studentId}/user/`,
    'instructor-subjects': `/instructors/subjects/`,
    'scores': '/scores/',
    'csv': '/csv/',
}


export const authAPI = () => axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Authorization": `Bearer ${cookie.load('access_token')}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000"
})
