import React from "react";
import { Button, Form, Input, message } from "antd";
import { useCreateTagMutation } from "@/api/Tag";
import { useNavigate } from "react-router-dom";

type FieldType = {
  name?: string;
};

const AdminTagAdd: React.FC = () => {
  const navigate = useNavigate()

  const [add,{error}]:any = useCreateTagMutation();
  if(error) (
    message.error({
      content: error?.data.message,
    })
  )
  const onFinish = async (values: any) => {
    add(values).then(()=> message.success({
      content: "Thêm tag thành công"
    })).then(()=> navigate('/admin/tags'));
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label=" Tag Name"
        name="name"
        rules={[{ required: true, message: "Please input tag name !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="text-black">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminTagAdd;
