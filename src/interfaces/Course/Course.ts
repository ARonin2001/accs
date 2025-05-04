import { BaseEntity } from "../BaseEntity";
import { Lesson } from "../Lesson/Lesson";

export interface Course extends BaseEntity {
  id: number;
  title: string;
  description?: string;
  status: number;
  logo?: string;
  lessons: Lesson[];
}
