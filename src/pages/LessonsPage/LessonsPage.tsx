import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Actions } from "../../components/Actions/Actions";
import { LessonCreateForm } from "../../components/Lesson/LessonForm/LessonForm";
import { ListCards } from "../../components/ListCards/ListCards";
import { LessonDto } from "../../dto/LessonDto/LessonDto";
import { Queries } from "../../hooks/queries";

export const LessonsPage: FC = () => {
  const { courseId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const { data: lessons } = Queries.get<LessonDto[]>(
    `lesson/get-by-course-id/${courseId}`,
    ["get-by-course-id"]
  );

  const navigateToLessonById = (lesson: LessonDto) => {
    navigate("/lesson/" + lesson.id);
  };

  return (
    <div className="lesson_page">
      <Actions onClickAdd={toggleShowForm} />
      {showForm ? (
        <LessonCreateForm />
      ) : (
        <ListCards list={lessons} onClickCard={navigateToLessonById} />
      )}
    </div>
  );
};
