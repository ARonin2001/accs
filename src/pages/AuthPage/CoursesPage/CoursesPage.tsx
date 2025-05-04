import { Button, Form, FormProps, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useState } from "react";
import {
  BUTTON_ACTIONS,
  CourseActions,
} from "../../../components/Course/CourseActions/CourseActions";
import { ListCards } from "../../../components/ListCards/ListCards";
import { CreatingCourseDto } from "../../../dto/CreatingCourseDto";
import { Queries } from "../../../hooks/queries";
import { Course } from "../../../interfaces/Course/Course";

type FieldType = {
  title: string;
  description?: string;
  status: number[];
};

export const CoursesPage: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  const { data, error, isFetching } = Queries.get<Course[]>("course/get-all", [
    "courses",
  ]);

  const mutation = Queries.getMutationPost<CreatingCourseDto, any>(
    "course/create"
  );

  const [messageApi, contextHolder] = message.useMessage();

  const showMessageError = (content: any) => {
    messageApi.error({
      content,
    });
  };

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleClickaAction = (btnAction: string | null) => {
    if (!btnAction) return;

    switch (btnAction) {
      case BUTTON_ACTIONS.ADD:
        toggleShowForm();
        break;
      default:
        break;
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("onFinish", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("error", errorInfo);
    // showMessageError(errorInfo.errorFields);
  };

  const onSubmitCapture: FormProps<FieldType>["onSubmitCapture"] = (values) => {
    console.log("submit", values);
  };

  const onSubmit = async () => {
    try {
      const formValues: FieldType = await form.validateFields();
      await mutation.mutateAsync({
        ...formValues,
        status: formValues.status[0],
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <h1>Error {error.message}</h1>;
  if (mutation.isPending) <h1>Pending</h1>;
  if (mutation.isError) <h1>ERROR MUTATION</h1>;
  if (mutation.data) <h1>Data {mutation.data}</h1>;

  return (
    <div className="courses">
      {contextHolder}
      <CourseActions onClick={handleClickaAction} />

      {showForm && (
        <Form
          name="add-course-form"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onSubmitCapture={onSubmitCapture}
          initialValues={{ status: [1] }}
        >
          <Form.Item<FieldType>
            label="Название"
            name="title"
            rules={[
              { required: false, message: "Пожалуйста, заполните поле!" },
            ]}
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
      )}

      {!showForm && <ListCards list={data || []} isLoading={isFetching} />}
    </div>
  );
};
