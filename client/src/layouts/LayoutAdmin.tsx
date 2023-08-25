import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FundOutlined,
  HddOutlined,
  ProjectOutlined,
  TagOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FundOutlined />,
              label: (
                <Button className="border border-none text-white">
                  <Link to={"dashboard"}><span>DashBoard</span></Link>
                </Button>
              ),
            },
            {
              key: "2",
              icon: <HddOutlined />,
              label: (
                <Button className="border border-none text-white">
                  <Link to={"blogs"}><span>Blog</span></Link>
                </Button>
              ),
            },
            {
              key: "3",
              icon: <ProjectOutlined />,
              label: (
                <Button className="border border-none text-white">
                  <Link to={"projects"}><span>Project</span></Link>
                </Button>
              ),
            },
            {
              key: "4",
              icon: <TagOutlined />,
              label: (
                <Button className="border border-none text-white">
                  <Link to={"tags"}><span>Tag</span></Link>
                </Button>
              ),
            },
            {
              key: "5",
              icon: <FormOutlined />,
              label: (
                <Button className="border border-none text-white">
                  <Link to={"reviews"}><span>Customer Review</span></Link>
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
