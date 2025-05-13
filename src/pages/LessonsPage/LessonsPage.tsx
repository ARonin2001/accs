import { Modal, Typography } from "antd";
import { Store } from "antd/es/form/interface";
import { MenuInfo } from "rc-menu/lib/interface";
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonDto | null>(null);
  const [initialValues, setInitialValues] = useState<Store | undefined>(
    undefined
  );

  const deleteMutation = Queries.getMutationDelete<LessonDto, any>(
    "lesson/delete/" + selectedLesson?.id
  );

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const { data: lessons, refetch } = Queries.get<LessonDto[]>(
    `lesson/get-by-course-id/${courseId}`,
    ["get-by-course-id"]
  );

  const navigateToLessonById = (lesson: LessonDto) => {
    navigate("/lesson/" + lesson.id);
  };

  const onSuccessSubmit = () => {
    toggleShowForm();
    refetch();
  };

  const onClickDropdownDelete = () => {
    setShowModalDelete(true);
  };

  const deleteLesson = async () => {
    await deleteMutation.mutateAsync(undefined);
    setShowModalDelete(false);
    refetch();
  };

  const setInitialValuesForm = (lesson: LessonDto) => {
    setInitialValues({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      body: lesson.body,
    });
  };

  const onClickDropdown = (info: MenuInfo, lesson: LessonDto) => {
    const dataAction = info.domEvent.currentTarget
      .querySelector("[data-action]")
      ?.getAttribute("data-action");

    switch (dataAction) {
      case "edit":
        setInitialValuesForm(lesson);
        toggleShowForm();
        break;
      case "delete":
        setSelectedLesson(lesson);
        break;
    }
  };

  return (
    <div className="lesson_page">
      <Typography.Title>Уроки</Typography.Title>
      <Actions onClickAdd={toggleShowForm} />
      {showForm ? (
        <LessonCreateForm
          courseId={Number(courseId) || 1}
          initialValues={initialValues}
          onSuccessSubmit={onSuccessSubmit}
        />
      ) : (
        <ListCards
          list={lessons}
          onClickCard={navigateToLessonById}
          onClickDropdownDelete={onClickDropdownDelete}
          onClickDrowpdown={onClickDropdown}
          onClickCreate={() => setShowForm(true)}
        />
      )}

      {showModalDelete && (
        <Modal
          title={`Удалить урок `}
          open={showModalDelete}
          onCancel={() => setShowModalDelete(false)}
          onOk={deleteLesson}
        ></Modal>
      )}
    </div>
  );
};
