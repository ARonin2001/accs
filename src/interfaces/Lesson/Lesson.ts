import { BaseEntity } from "../BaseEntity";
import { Course } from "../Course/Course";

export interface Lesson extends BaseEntity {
  id: number;
  title: string;
  description?: string;
  status: number;
  logo?: string;
  body?: string;
  course: Course;
}
