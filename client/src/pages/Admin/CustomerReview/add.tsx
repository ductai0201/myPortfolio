import React, { useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCreateReviewMutation } from "@/api/Review";
import { useNavigate } from "react-router-dom";
type FieldType = {
  name?: string;
  content?: string;
};

const AdminCustomerReviewAdd: React.FC = () => {
  /* xử lí ảnh */
  const [fileList, setFileList] = useState([]);
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
  /*end ảnh */
  const navigate = useNavigate();

  const [add, { error }]: any = useCreateReviewMutation();
  if (error)
    message.error({
      content: error?.data.message,
    });
  const onFinish = async (values: any) => {
    const urls = await uploadFiles(files);
    const finalValues = {
      name: values.name,
      gallery: urls,
      content: values.content,
    };
    add(finalValues)
      .then(() =>
        message.success({
          content: "Thêm customer review thành công",
        })
      )
      .then(() => navigate("/admin/reviews"));
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
        label=" Customer Name"
        name="name"
        rules={[{ required: true, message: "Please input customer name !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input content !" }]}
      >
        <Input />
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

export default AdminCustomerReviewAdd;
