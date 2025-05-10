import { FC, useState } from "react";

import { useNavigate } from "react-router";
import { Actions } from "../../components/Actions/Actions";
import { AppCard } from "../../components/AppCard/AppCard";
import { CourseForm } from "../../components/Course/CourseForm/CourseForm";
import { ListCards } from "../../components/ListCards/ListCards";
import { Queries } from "../../hooks/queries";
import { Course } from "../../interfaces/Course/Course";
import style from "./CoursesPage.module.scss";

export const CoursesPage: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const { data, error, isFetching } = Queries.get<Course[]>("course/get-all", [
    "courses",
  ]);

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const navigateToLessons = (item: Course) => {
    console.log("sdfsdfdsfk", item);
    navigate(item.id.toString());
  };

  if (error) return <h1>Error {error.message}</h1>;

  return (
    <div className="courses">
      <Actions onClickAdd={toggleShowForm} />

      {showForm ? (
        <AppCard
          className={style.courses__form_card}
          title="Создание курса"
          style={{ maxWidth: "500px" }}
          showExtraClose
          onExtraClick={toggleShowForm}
        >
          <CourseForm />
        </AppCard>
      ) : (
        <ListCards
          list={data}
          isLoading={isFetching}
          onClickCard={navigateToLessons}
        />
      )}
    </div>
  );
};
