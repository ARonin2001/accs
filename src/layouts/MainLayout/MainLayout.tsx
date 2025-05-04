import { Layout, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router";
import styles from "./MainLayout.module.scss";

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 3 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

export const MainLayout: React.FC = () => {
  return (
    <Layout className={`layout ${styles.layout}`}>
      <Header className={styles.header}>
        <h1>LOGO</h1>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
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
