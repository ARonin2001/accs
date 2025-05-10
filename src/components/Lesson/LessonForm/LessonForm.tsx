import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { CreatingLessonDto } from "../../../dto/LessonDto/CreatingLessonDto";
import { Queries } from "../../../hooks/queries";
import { AppCard } from "../../AppCard/AppCard";
import { LessonEditor } from "./LessonEditor/LessonEditor";

type FieldType = {
  title: string;
  description?: string;
  body?: string;
};

const ERROR_MESSAGE_FEILD = "Пожалуйста, заполните поле!";

export const LessonCreateForm: FC = () => {
  const [form] = Form.useForm();

  const mutation = Queries.getMutationPost<CreatingLessonDto, any>(
    "lesson/create"
  );

  const onSubmit = async () => {
    try {
      const formValues: FieldType = await form.validateFields();
      const res = await mutation.mutateAsync({
        ...formValues,
        courseId: 1,
        status: 1,
      });
      console.log("result", res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppCard title="Создание урока">
      <Form name="create-lesson-form" form={form} layout="vertical">
        <Form.Item<FieldType>
          label="Название"
          name="title"
          rules={[{ required: true, message: ERROR_MESSAGE_FEILD }]}
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
          <Button type="primary" onClick={onSubmit}>
            СОЗДАТЬ
          </Button>
        </Form.Item>
      </Form>
    </AppCard>
  );
};
