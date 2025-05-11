import { Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { FC } from "react";

export type CourseFilterFieldType = {
  title?: string;
};

interface CourseFilterProps {
  onSubmit?: (fieldsValue: CourseFilterFieldType) => void;
}

export const CourseFilter: FC<CourseFilterProps> = ({ onSubmit }) => {
  const [form] = useForm();

  const handleSubmit = () => {
    const fieldsValue: CourseFilterFieldType = form.getFieldsValue();
    onSubmit?.(fieldsValue);
  };

  return (
    <div className="course-filter">
      <Typography.Title level={2}>Поиск</Typography.Title>
      <Form form={form} layout="vertical">
        <FormItem<CourseFilterFieldType> name="title" label="Название">
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={handleSubmit}>
            ПОИСК
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
