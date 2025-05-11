import { FC, useEffect, useState } from "react";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Modal } from "antd";
import { Store } from "antd/es/form/interface";
import { MenuInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router";
import { Actions } from "../../components/Actions/Actions";
import { AppCard } from "../../components/AppCard/AppCard";
import { CourseForm } from "../../components/Course/CourseForm/CourseForm";
import { ListCards } from "../../components/ListCards/ListCards";
import { Queries } from "../../hooks/queries";
import { Course } from "../../interfaces/Course/Course";
import style from "./CourseContent.module.scss";

interface CourseContentProps {
  courses?: Course[];
  refetchCourses?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Course[], Error>>;
  isFetching?: boolean;
}

export const CourseContent: FC<CourseContentProps> = ({
  courses = [],
  isFetching = false,
  refetchCourses,
}) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Course | null>(null);
  const [deleteCourseIsFetching, setDeleteCourseIsFetching] = useState(false);
  const [initialValues, setInitialValuse] = useState<Store | null>(null);

  //   const { data, error, isFetching, refetch } = Queries.get<Course[]>(
  // "course/get-all",
  // ["courses"]
  //   );

  const deleteCourseMutation = Queries.getMutationDelete<Course, any>(
    "course/delete/" + selectedCard?.id
  );

  useEffect(() => {
    if (!showForm && initialValues) {
      setInitialValuse(null);
    }
  }, [showForm]);

  const onClickEditCourse = (course: Course) => {
    setInitialValuse({
      id: course.id,
      title: course.title,
      description: course.description,
    });
    toggleShowForm();
  };

  const onClickDropdown = (info: MenuInfo, course: Course) => {
    setSelectedCard(course);

    if (info.domEvent.currentTarget.querySelector('[data-action="edit"]')) {
      onClickEditCourse(course);
    }
  };

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const navigateToLessons = (course: Course) => {
    navigate(course.id.toString());
  };

  const deleteCourse = async () => {
    if (!selectedCard) return;

    setDeleteCourseIsFetching(true);
    const { isPending } = await deleteCourseMutation.mutateAsync(undefined);
    setDeleteCourseIsFetching(isPending);
    setShowModalDelete(false);
    refetchCourses?.();
  };

  const onSubmitedForm = () => {
    toggleShowForm();
    refetchCourses?.();
  };

  return (
    <div className="courses">
      <Actions onClickAdd={toggleShowForm} />

      {showForm ? (
        <AppCard
          className={style.course__form_card}
          title="Создание курса"
          style={{ maxWidth: "500px" }}
          showExtraClose
          onExtraClick={toggleShowForm}
        >
          <CourseForm
            onSubmited={onSubmitedForm}
            initialValues={initialValues || undefined}
          />
        </AppCard>
      ) : (
        <ListCards
          list={courses}
          isLoading={isFetching}
          onClickDrowpdown={onClickDropdown}
          onClickCard={navigateToLessons}
          onClickCreate={toggleShowForm}
          onClickDropdownDelete={() => setShowModalDelete(true)}
        />
      )}

      {showModalDelete && (
        <Modal
          title={`Удалить курс "${selectedCard?.title}"`}
          open={showModalDelete}
          onCancel={() => setShowModalDelete(false)}
          onOk={deleteCourse}
          confirmLoading={deleteCourseIsFetching}
        ></Modal>
      )}
    </div>
  );
};
