import { useContext } from "react";
import { PageContext } from "../../lib/context";
import { Button, Form, Input } from "antd";
import nwssu from "../../assets/nwssu.png"
import trash from "../../assets/trash_gif.gif"
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

const LoginView = () => {
  const { handleSubmit } = useContext(PageContext);
  return (
    <div className="h-screen w-full flex md:flex-row flex-col">
      <div className="md:w-2/3 md:block hidden h-14 bg-red-300">
        <img src={trash} className="w-full h-screen object-cover" alt="illustration" />
      </div>
      <div className="flex flex-col justify-center items-center md:w-1/3 w-full h-full">
        <div className="flex flex-row items-center gap-3 mb-3">
          <img src={nwssu} alt="water-logo" className="h-10 w-10" />
          <p className="text-2xl font-bold" style={{ color: '#233863' }}>
            Trash Monitoring
          </p>
        </div>
        <div className="">
          <p className="text-sm font-semibold mb-3">Login to NwSSU Trash Monitoring System</p>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="username" label="Username">
              <Input
                placeholder="Username"
                prefix={<UserOutlined color="#ccc" />}
                className="rounded-full"
              />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password
                placeholder="Password"
                prefix={<KeyOutlined color="#ccc" />}
                className="rounded-full"
              />
            </Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
