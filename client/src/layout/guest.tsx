import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DeleteOutlined,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import trashIcon from "../assets/trashIcon.gif"
import auth from "../lib/services";
import CustomDropdown from "../component/dropdown";
const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "trash-bin",
    icon: <DeleteOutlined />,
    label: "Trash Bin",
  },
  {
    key: "user-management",
    icon: <UserOutlined />,
    label: "User Management",
  },
  {
    key: "history",
    icon: <HistoryOutlined />,
    label: "History",
  },
  {
    key: "settings",
    icon: <AppstoreOutlined />,
    label: "Settings",
  },
];

const GuestLayout = () => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { firstName, middleName, lastName } = auth.getUserInfo();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/dashboard":
        return ["dashboard"];
      case "/trash-bin":
        return ["trash-bin"];
      case "/user-management":
        return ["user-management"];
      case "/history":
        return ["history"];
      case "/settings":
        return ["settings"];
      default:
        return ["dashboard"];
    }
  };

  const navigateTo = (e) => {
    if (e.key === "logout") {
      auth.clear();
    }
    navigate(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex flex-col">
      <Header
        className="flex items-center justify-between px-2 py-0 m-0 bg-white"
      >
        <div className="flex flex-row items-center">
          <Button
            onClick={toggleCollapsed}
            className="px-2 py-0"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <img
            src={trashIcon}
            className="cursor-pointer px-2 py-0 h-16"
            alt=""
            onClick={() => (window.location.href = "/")}
          />
          <p className="text-sm font-semibold md:text-xl">Trash Monitoring</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="mr-2 text-base font-semibold capitalize">{`${firstName ?? ""} ${`${
            middleName ? `${middleName[0]}.` : ""
          }`} ${lastName ?? ""}`}</p>
          <CustomDropdown />
        </div>
      </Header>
      <Layout className="flex flex-row max-h-[93dvh] h-[93dvh]">
        <div className="bg-white hidden mt-2">
          <Menu
            theme="light"
            selectedKeys={getSelectedKey()}
            mode="inline"
            items={items}
            onClick={navigateTo}
            inlineCollapsed={collapsed}
          />
        </div>
        <div
          className={`bg-white lg:block ${collapsed ? "hidden" : "block"} mt-2`}
        >
          <Menu
            theme="light"
            selectedKeys={getSelectedKey()}
            mode="inline"
            items={items}
            onClick={navigateTo}
            inlineCollapsed={collapsed}
          />
        </div>
        <Layout className="flex p-0 m-2">
          <Content className="m-0 p-0">
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            All Rights Reserved™ 2023
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default GuestLayout;
