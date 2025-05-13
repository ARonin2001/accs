import { Button, Layout, Menu, Typography } from "antd";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import styles from "./MainLayout.module.scss";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 1,
    label: <NavLink to="courses">курсы</NavLink>,
  },
];

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();

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
        <Button type="link" onClick={() => navigate(-1)}>
          {"<"} назад
        </Button>
        <Button type="link" onClick={() => navigate(1)}>
          вперёд {">"}
        </Button>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
