import { Button, Col, Collapse, Form, Input, Row } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
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

  const handleResetForm = () => {
    form.resetFields();
  };

  return (
    <div className="course-filter">
      <Collapse defaultActiveKey={["1"]}>
        <CollapsePanel header="Фильтры" key="1">
          <Form form={form} layout="vertical" onSubmitCapture={handleSubmit}>
            <FormItem<CourseFilterFieldType> name="title" label="Название">
              <Input allowClear style={{ maxWidth: 500 }} />
            </FormItem>
            <FormItem>
              <Row gutter={10}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    ПОИСК
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleResetForm}>СБРОСИТЬ</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};
