import { Button, Form, FormProps, Input } from "antd";
import { FC } from "react";
import { instance } from "../../../../api";
import { Student } from "../../../../interfaces/Student";
import studentStore from "../../../../store";

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const AuthLoginForm: FC = () => {
  const { student, setStudent } = studentStore();

  const onSubmit = async () => {
    const res = await instance.post<Student>(
      import.meta.env.VITE_API + "auth/login",
      {
        email: "test@mail.ru",
        password: "123123",
      }
    );

    setStudent(res.data);
    console.log("student", student);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onSubmitCapture={onSubmit}
    >
      <Form.Item<FieldType>
        label="Логин"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" block>
          ВОЙТИ
        </Button>
      </Form.Item>
    </Form>
  );
};
