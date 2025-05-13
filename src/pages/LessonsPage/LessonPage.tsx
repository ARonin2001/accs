import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppCard } from "../../components/AppCard/AppCard";
import { Lesson } from "../../components/Lesson/Lesson";
import { LessonEditor } from "../../components/Lesson/LessonForm/LessonEditor/LessonEditor";
import { CreatingLessonDto } from "../../dto/LessonDto/CreatingLessonDto";
import { LessonDto } from "../../dto/LessonDto/LessonDto";
import { Queries } from "../../hooks/queries";

type FieldType = {
  title: string;
  description?: string;
  body?: string;
};

type UpdateLessonDto = Omit<Partial<CreatingLessonDto>, "status"> & {
  id: number;
};

export const LessonPage: FC = () => {
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const { data, isFetching, refetch } = Queries.get<LessonDto>(
    "lesson/get-by-id/" + id,
    ["lesson/get-by-id"]
  );

  const editLessonMutation = Queries.getMutationPut<UpdateLessonDto, any>(
    "lesson/update"
  );

  const deleteLessonMutation = Queries.getMutationDelete("lesson/delete/" + id);

  const handleSubmitEidtForm = async () => {
    try {
      const formValues: FieldType = await form.validateFields();
      const updateData: UpdateLessonDto = {
        ...formValues,
        id: Number(id),
      };
      await editLessonMutation.mutateAsync(updateData);
      setShowEditForm(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitDeleteLesson = async () => {
    const confirmed = await modal.confirm({
      title: "Вы точно хотите удалить урок?",
      content: "Восстановление урока будет невозможен",
    });

    if (!confirmed) return;

    const { error } = await deleteLessonMutation.mutateAsync(undefined);

    if (!error) navigate(-1);
  };

  // if (error) return { error };
  if (isFetching) return <h1>Is Fetching</h1>;

  return (
    <div className="lesson-page">
      {contextHolder}
      {data && !showEditForm && (
        <Lesson
          title={data.title}
          description={data.description}
          body={data.body}
          onClickEditButton={() => setShowEditForm(true)}
          onClickDelte={handleSubmitDeleteLesson}
        />
      )}
      {showEditForm && data && (
        <AppCard
          title="Редактирование урока"
          extra={<CloseOutlined onClick={() => setShowEditForm(false)} />}
        >
          <Form
            name="create-lesson-form"
            form={form}
            layout="vertical"
            initialValues={{ ...data }}
          >
            <Form.Item<FieldType>
              label="Название"
              name="title"
              rules={[{ required: true, message: "Заполните поле" }]}
            >
              <Input placeholder="Название" style={{ maxWidth: "500px" }} />
            </Form.Item>
            <Form.Item<FieldType> label="Описание" name="description">
              <TextArea placeholder="Описание" style={{ maxWidth: "500px" }} />
            </Form.Item>
            <Form.Item<FieldType> label="Урок" name="body">
              <LessonEditor />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSubmitEidtForm}>
                РЕДАКТИРОВАТЬ
              </Button>
            </Form.Item>
          </Form>
        </AppCard>
      )}
    </div>
  );
};
