import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  UploadProps,
  Checkbox,
  Col,
  Row,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCreateProjectMutation } from "@/api/Project";
import { useGetAllTagQuery } from "@/api/Tag";
import { useNavigate } from "react-router-dom";
type FieldType = {
  name?: string;
};

const AdminProjectAdd: React.FC = () => {
  const navigate = useNavigate()

  /* xử lí ảnh */
  const [fileList, setFileList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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
  const [add,{error}]:any = useCreateProjectMutation();
  const { data: tags }: any = useGetAllTagQuery();
  if(error) (
    message.error({
      content: error?.data.message,
    })
  )
  const onFinish = async (values: any) => {
    const urls = await uploadFiles(files);
    const finalValues = {
      name: values.name,
      gallery: urls,
      tagId: selectedTags
    };
    add(finalValues).then(()=> message.success({
      content: "Thêm project thành công"
    })).then(()=> navigate('/admin/projects'));
    
  };
  const onChange = (checkedValues: any) => {
    setSelectedTags(checkedValues)
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
        label=" Project Name"
        name="name"
        rules={[{ required: true, message: "Please input project name !" },{min:6}]}
      >
        <Input />
      </Form.Item>

      <Checkbox.Group
        className="ml-[120px] mb-6"
        style={{ width: "100%" }}
        onChange={onChange}
      >
        <Row>
          {tags?.dataTag.map((tag: any) => (
            <Col span={8} key={tag._id}>
              <Checkbox value={tag._id}>{tag?.name}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
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

export default AdminProjectAdd;
