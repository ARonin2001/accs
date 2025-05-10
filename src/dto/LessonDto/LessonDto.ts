import { BaseDto } from "../BaseDto";

export interface LessonDto extends BaseDto {
  status: number;
  title: string;
  description: string;
  logo: string;
  body: string;
  course: any;
}
