import { Layout, Menu, Typography } from "antd";
import React from "react";
import { NavLink, Outlet } from "react-router";
import styles from "./MainLayout.module.scss";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 1,
    label: <NavLink to="courses">курсы</NavLink>,
  },
];

export const MainLayout: React.FC = () => {
  return (
    <Layout className={`layout ${styles.layout}`}>
      <Header className={styles.header}>
        <Typography.Title style={{ color: "white" }}>LOGO</Typography.Title>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
