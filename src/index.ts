export type CourseStatus = 'EMPTY' | 'NON_VIABLE' | 'VIABLE' | 'FULL';

export interface Course {
    id: string;
    title: string;
    minAttendees: number;
    maxAttendees: number;
    attendees: Student[];
    status: CourseStatus | null;
}

export interface Student {
    id: string;
    name: string;
}

export const courseRepository: Course[] = []; 

export const getCourseById = (courseId: Course['id']) => {
    return courseRepository.find(course => course.id === courseId);
}

export const addNewCourse = (course: Course) => {
    courseRepository.push(course);
}

export const updateCourse = (course: Course) => {
    let existingCourseIndex = courseRepository.findIndex(c => c.id === course?.id);
    courseRepository[existingCourseIndex] = course;
}

export const enrollAStudentToCourse = (courseId: Course['id'], student: Student) => {
    const course = getCourseById(courseId);
    if (!course) throw Error('Course was not found');
    if (course.status === 'FULL') throw new Error('Course is full, cant enroll');
    course.attendees.push(student);
    const {minAttendees, maxAttendees} = course;
    const attendees = course?.attendees?.length;
    if (attendees < minAttendees) {
        course.status = 'NON_VIABLE';
    } else if (attendees === minAttendees) {
        course.status = 'VIABLE';
    } else if (attendees === maxAttendees) {
        course.status = 'FULL';
    }
    updateCourse(course);
}