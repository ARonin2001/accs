import { Space } from "antd";
import { FC } from "react";
import { Outlet } from "react-router";

export const AuthPage: FC = () => {
  return (
    <Space align="center">
      <Outlet />
    </Space>
  );
};
