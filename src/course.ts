import { CourseStatus, Student } from "./types";

export interface Course {
    title: string;
    minAttendees: number;
    maxAttendees: number;
    attendees: Student[];
    status: CourseStatus;
}

interface CreateCourseDto {
    title: string;
    minAttendees: number;
    maxAttendees: number;
}

export const createCourse = ({
    title,
    minAttendees,
    maxAttendees,
}: CreateCourseDto): Course => {
    if (minAttendees > maxAttendees) {
        throw new Error('min attendees cant exceed max attendees')
    }
    return {
        title,
        minAttendees,
        maxAttendees,
        status: 'EMPTY',
        attendees: [],
    }
};