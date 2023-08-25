import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "@/api/Blog";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type FieldType = {
  title?: string;
  description?: string;
  content?: string;
};

const AdminblogUpdate: React.FC = () => {
  const [fileList, setFileList] = useState([]);
  const { id }: any = useParams();
  const { data }: any = useGetBlogByIdQuery(id);
  const [update, { error }]: any = useUpdateBlogMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
    setFileList(data?.gallery);
  }, [data]);

  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => setFileList(newFileList);

  const files = fileList?.map((item: any) => {
    return item.originFileObj;
  });
  const uploadFiles = async (files: any) => {
    const CLOUD_NAME = "dtiwyksp8";
    const PRESET_NAME = "Portfolio";
    const FOLDER_NAME = "My_Portfolio";
    const url = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    for (const file of files) {
      formData.append("file", file);
      try {
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        url.push(response.data.secure_url);
        return url;
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (error)
    message.error({
      content: error?.data.message,
    });
  const onFinish = async (values: any) => {
    const url = await uploadFiles(files);
    const dataUpdate = {
      _id: id,
      title: values.title,
      description: values.description,
      content: values.content,
      gallery: url,
    };
    update(dataUpdate)
      .then(() =>
        message.success({
          content: "Update blog thành công",
        })
      )
      .then(() => navigate("/admin/blogs"));
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
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input title blog!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input your description!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Content"
        name="content"
        rules={[{ message: "Please input your description!" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="upload" label="Upload">
        <Upload
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
          name="logo"
          listType="picture"
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="text-black">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminblogUpdate;
