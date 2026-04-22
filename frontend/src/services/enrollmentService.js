import api from './api';

export const enrollmentService = {
  enrollCourse: (courseId) => api.post('/enroll', { courseId }),
  getMyCourses: () => api.get('/enroll/my-courses'),
  getEnrollment: (enrollmentId) => api.get(`/enroll/${enrollmentId}`),
  updateProgress: (enrollmentId, data) => api.put(`/enroll/${enrollmentId}`, data),
  getCourseEnrollments: (courseId) => api.get(`/enroll/course/${courseId}`),
};

export default enrollmentService;