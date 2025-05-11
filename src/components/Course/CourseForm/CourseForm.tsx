import { Button, Form, Input, Select } from "antd";
import { Store } from "antd/es/form/interface";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { CreatingCourseDto } from "../../../dto/CreatingCourseDto";
import { Queries } from "../../../hooks/queries";

type FieldType = {
  id?: number;
  title: string;
  description?: string;
  status: number[];
};

interface CourseFormProps {
  onSubmited?: () => void;
  initialValues?: Store;
}

export const CourseForm: FC<CourseFormProps> = ({
  initialValues,
  onSubmited,
}) => {
  const [form] = Form.useForm();

  const mutation = Queries.getMutationPost<CreatingCourseDto, any>(
    "course/create"
  );

  const onSubmit = async () => {
    try {
      const formValues: FieldType = await form.validateFields();
      await mutation.mutateAsync({
        ...formValues,
        status: formValues.status[0],
      });
      onSubmited?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      name="add-course-form"
      layout="vertical"
      form={form}
      initialValues={{ status: [1], ...initialValues }}
    >
      <Form.Item<FieldType> name="id" style={{ display: "none" }} />
      <Form.Item<FieldType>
        label="Название"
        name="title"
        rules={[{ required: true, message: "Пожалуйста, заполните поле!" }]}
      >
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item<FieldType> label="Описание" name="description">
        <TextArea placeholder="Описание" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Статус"
        name="status"
        rules={[{ required: true, message: "Пожалуйста, заполните поле!" }]}
      >
        <Select placeholder="Статус" defaultValue={1}>
          <Select.Option value={1}>Default</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          СОЗДАТЬ
        </Button>
      </Form.Item>
    </Form>
  );
};
