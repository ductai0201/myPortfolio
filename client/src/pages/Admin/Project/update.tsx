import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "@/api/Project";
import { useGetAllTagQuery } from "@/api/Tag";

type FieldType = {
  name?: string;
};

const AdminProjectUpdate: React.FC = () => {
  const { id }: any = useParams();
  const { data }: any = useGetProjectByIdQuery(id);
  const [fileList, setFileList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate()

  const [update,{error}]:any = useUpdateProjectMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
    setFileList(data?.gallery);
    setSelectedTags(data?.tagId);
  }, [data]);

  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => setFileList(newFileList);

  const onChange = (checkedValues: any) => {
    setSelectedTags(checkedValues);
  };
  const { data: tags }: any = useGetAllTagQuery();

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

  if(error) (
    message.error({
      content: error?.data.message,
    })
  )
  const onFinish = async (values: any) => {
    const url = await uploadFiles(files);
    const dataUpdate = {
      _id: id,
      name: values.name,
      tagId: selectedTags,
      gallery: url,
    };
    update(dataUpdate).then(()=> message.success({
      content: "Update project thành công"
    })).then(()=> navigate('/admin/projects'));
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

      <Checkbox.Group
        className="ml-[120px] mb-6"
        style={{ width: "100%" }}
        onChange={onChange}
        defaultValue={selectedTags}
        // defaultValue={['64e798829e9cd290f33284fc','64e798899e9cd290f33284fe']}
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

export default AdminProjectUpdate;
