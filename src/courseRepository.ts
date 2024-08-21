import { CourseRepository } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const courseRepository: CourseRepository = {
    store: [],
    save(course) {
        const randomId = uuidv4();
        const newCourse = {...course, id: randomId};
        this.store.push(newCourse);
        return newCourse;
    },
    update(id, updatedCourse) {
        const index = this.store.findIndex(c => c.id === id);
        if (index !== -1) {
            this.store.splice(index, 1, updatedCourse);
        }
        return this.store[index];
    },
    findById(id) {
        const existingCourse = this.store.find(course => course.id === id);
        if (!existingCourse) {
            throw new Error('Course not found');
        }
        return existingCourse;
    }
};