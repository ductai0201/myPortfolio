import React, { ReactNode } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllBlogQuery, useRemoveBlogMutation } from "@/api/Blog";
import { IBlog } from "@/interfaces/Blog";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
interface DataType {
  key: string;
  title: string;
  description: string;
  content: string;
  image: string | ReactNode;
  gallery: string  
}

const AdminBlog: React.FC = () => {
  const { data }: any = useGetAllBlogQuery();
  const [remove] = useRemoveBlogMutation();

  const dataSource = data?.dataBlog.map((item: IBlog) => ({
    key: item._id,
    title: item.title,
    description: item.description,
    content: item.content,
    gallery: item.gallery
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      key: "gallery",
      render:(_,record):any=>(
        <div className="w-[200px] "><img className="rounded-md" src={record!.gallery} alt="" /></div>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, { key: id }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/blogs/update/${id}`}>
              <EditOutlined />
            </Link>
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() =>
              remove(id).then(() =>
                message.success({
                  content: "Đã xóa blog thành công!",
                })
              )
            }
            okText={
              <div className="text-black hover:text-white rounded">Yes</div>
            }
            cancelText="No"
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="mb-4">
        <Button><Link to={'add'}>Create</Link></Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 2,
        }}
      />
    </>
  );
};
export default AdminBlog;
