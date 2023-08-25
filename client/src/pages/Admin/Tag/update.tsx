import React, { useEffect } from "react";
import { Button, Form, Input, message} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTagByIdQuery, useUpdateTagMutation } from "@/api/Tag";

type FieldType = {
  name?: string;
};

const AdminTagUpdate: React.FC = () => {
  const { id }: any = useParams();
  const { data }: any = useGetTagByIdQuery(id);
  const [update,{error}]:any = useUpdateTagMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  if(error) (
    message.error({
      content: error?.data.message,
    })
  )
  const onFinish = async (values: any) => {
    const dataUpdate = {
      _id: id,
      name: values.name,
    };
    update(dataUpdate).then(()=> message.success({
    content: "Update tag thành công"
  })).then(()=> navigate('/admin/tags'));
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Project Name"
        name="name"
        rules={[{ required: true, message: "Please input project name!" }]}
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

export default AdminTagUpdate;
