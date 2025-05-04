import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";

import { FC } from "react";
import styles from "./ClearLayout.module.scss";

export const ClearLayout: FC = () => {
  return (
    <Layout className={`layout ${styles.layout}`}>
      <Content className={styles.content}>
        <Outlet></Outlet>
      </Content>
    </Layout>
  );
};
