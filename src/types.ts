import { Course } from "./course";

export type CourseStatus = 'EMPTY' | 'NON_VIABLE' | 'VIABLE' | 'FULL';

export interface Student {
    id: string;
    name: string;
}

export interface PCourse {
    id: string;
    title: string;
    minAttendees: number;
    maxAttendees: number;
    attendees: Student[];
    status: CourseStatus;
}

export interface CourseRepository {
    store: PCourse[],
    save: (course: Course) => PCourse;
    update: (courseId: PCourse['id'], updatedCourse: PCourse) => PCourse;
    findById: (id: PCourse['id']) => PCourse;
};