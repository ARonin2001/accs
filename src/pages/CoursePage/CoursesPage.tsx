import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { CourseContent } from "../../components/Course/CourseContent";
import {
  CourseFilter,
  CourseFilterFieldType,
} from "../../components/Course/CourseFilter/CourseFilter";
import { Queries } from "../../hooks/queries";
import { Course } from "../../interfaces/Course/Course";

export const CoursesPage: FC = () => {
  const [filterQuery, setFilterQuery] = useState<string>("");

  const {
    data: courses,
    error,
    refetch,
  } = Queries.get<Course[]>("course/get-all" + filterQuery, ["courses"]);

  useEffect(() => {
    refetch();
  }, [filterQuery]);

  const onSubmitFilter = (fieldsValue: CourseFilterFieldType) => {
    let query = "?";

    for (const item in fieldsValue) {
      if (fieldsValue[item as keyof CourseFilterFieldType])
        query += `${item}=${fieldsValue[item as keyof CourseFilterFieldType]}&`;
    }

    setFilterQuery(query);
  };

  if (error)
    return <Typography.Title level={2}>{error.message}</Typography.Title>;

  return (
    <div className="courses_page">
      <Typography.Title>Курсы</Typography.Title>
      <CourseFilter onSubmit={onSubmitFilter} />
      <CourseContent courses={courses} refetchCourses={refetch} />
    </div>
  );
};
