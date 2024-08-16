import { addNewCourse, Course, enrollAStudentToCourse, getCourseById, Student } from "."
import { v4 as uuidv4 } from 'uuid';

// test helpers
const createStudent = (name: string): Student => ({name, id: uuidv4()});
const createCourse = (title: string, minAttendees:number, maxAttendees: number): Course =>  ({
    id: uuidv4(),
    title,
    minAttendees,
    maxAttendees,
    attendees: [],
    status: 'EMPTY',
})

describe('Scheduling a training course', () => {
    let course: Course;

    beforeAll(() => {
        course = createCourse('BDD for Beginners', 2, 3);
        addNewCourse(course);
    })

    it('course is not viable if attendees is less than minAttendees', () => {
        const alice = createStudent('Alice');
        enrollAStudentToCourse(course.id, alice);
        let savedCourse = getCourseById(course.id);
        expect(savedCourse?.status).toBe('NON_VIABLE');
    });

    it('course is viable if attendees equals to minAttendees', () => {
        const bob = createStudent('Bob');
        enrollAStudentToCourse(course?.id, bob);
        let savedCourse = getCourseById(course.id);
        expect(savedCourse?.status).toBe('VIABLE');
    });

    it('course is full if attendees equals to maxAttendees', () => {
        const charlie = createStudent('Charlie');
        enrollAStudentToCourse(course.id, charlie);
        let savedCourse = getCourseById(course.id);
        expect(savedCourse?.status).toBe('FULL');
    });

    it('should throw error if student enrolls an already full course', () => {
        const derek = createStudent('Derek');
        expect(() => enrollAStudentToCourse(course.id, derek)).toThrow('Course is full, cant enroll');
        let savedCourse = getCourseById(course.id);
        expect(savedCourse?.attendees?.length).toBe(3);
    });
})