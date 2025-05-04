import { Card } from "antd";
import { FC } from "react";
import { AuthLoginForm } from "./AuthLoginForm/AuthLoginForm";

import styles from "./AuthLogin.module.scss";

export const AuthLogin: FC = () => {
  return (
    <Card title="Авторизация" className={styles.card}>
      <AuthLoginForm />
    </Card>
  );
};
