import { createNewCourse, enrollAStudentToCourse } from "."
import { Course, createCourse } from "./course";
import { courseRepository } from "./courseRepository";
import { PCourse, Student } from "./types";
import { v4 as uuidv4 } from 'uuid';

// test helpers
const createStudent = (name: string): Student => ({name, id: uuidv4()});

describe('Scheduling a training course', () => {
    let course: Course;
    let pCourse: PCourse;

    beforeAll(() => {
        course = createCourse({title: 'BDD for Beginners', minAttendees: 2, maxAttendees: 3});
        pCourse = createNewCourse(course);
    })

    it('course is not viable if attendees is less than minAttendees', () => {
        const alice = createStudent('Alice');
        enrollAStudentToCourse(pCourse.id, alice);
        let savedCourse = courseRepository.findById(pCourse.id);
        expect(savedCourse?.status).toBe('NON_VIABLE');
    });

    it('course is viable if attendees equals to minAttendees', () => {
        const bob = createStudent('Bob');
        enrollAStudentToCourse(pCourse.id, bob);
        let savedCourse = courseRepository.findById(pCourse.id);
        expect(savedCourse?.status).toBe('VIABLE');
    });

    it('course is full if attendees equals to maxAttendees', () => {
        const charlie = createStudent('Charlie');
        enrollAStudentToCourse(pCourse.id, charlie);
        let savedCourse = courseRepository.findById(pCourse.id);
        expect(savedCourse?.status).toBe('FULL');
    });

    it('should throw error if student enrolls an already full course', () => {
        const derek = createStudent('Derek');
        expect(() => enrollAStudentToCourse(pCourse.id, derek)).toThrow('Course is full, cant enroll');
        let savedCourse = courseRepository.findById(pCourse.id);
        expect(savedCourse?.attendees?.length).toBe(3);
    });
})