import { createCourse } from "./course";
import { courseRepository } from "./courseRepository";
import { Student, CourseStatus, PCourse } from "./types";

interface createNewCourseDTO {
    title: string;
    minAttendees: number;
    maxAttendees: number;
}

export const createNewCourse = ({title, minAttendees, maxAttendees}: createNewCourseDTO) => {
    const course = createCourse({ title, minAttendees, maxAttendees });
    return courseRepository.save(course);
}

export const enrollAStudentToCourse = (courseId: PCourse['id'], student: Student) => {
    const course = courseRepository.findById(courseId);
    if (!course) {
        throw Error('Course was not found');
    }
    if (course.status === 'FULL') {
        throw new Error('Course is full, cant enroll');
    }

    let status: CourseStatus = course.status;
    let updatedCourse = {...course};
    let updatedAttendees = [...course.attendees, student];
    const {minAttendees, maxAttendees} = updatedCourse;
    const attendees = updatedAttendees.length;
    if (attendees < minAttendees) {
        status = 'NON_VIABLE';
    } else if (attendees === minAttendees) {
        status = 'VIABLE';
    } else if (attendees === maxAttendees) {
        status = 'FULL';
    }
    updatedCourse = {...course, attendees: updatedAttendees, status};
    return courseRepository.update(courseId, updatedCourse);
}