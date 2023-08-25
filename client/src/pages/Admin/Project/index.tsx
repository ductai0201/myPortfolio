import React from "react";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetAllProjectQuery, useRemoveProjectMutation } from "@/api/Project";
import { IProject } from "@/interfaces/Project";
import { useGetAllTagQuery } from "@/api/Tag";
interface DataType {
  key: string;
  name: string;
  gallery: string;
  tag: string[];
}
const AdminProject: React.FC = () => {
  const { data }: any = useGetAllProjectQuery();
  const [remove] = useRemoveProjectMutation();
  const { data: tagColection }: any = useGetAllTagQuery();

  const dataSource = data?.dataProject.map((item: IProject) => ({
    key: item._id,
    name: item.name,
    gallery: item.gallery,
    tag: item.tagId,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      key: "gallery",
      render: (_, record): any => (
        <div className="w-[200px] ">
          <img className="rounded-md" src={record!.gallery} alt="" />
        </div>
      ),
    },
    {
      title: "Tags",
      key: "tag",
      dataIndex: "tag",
      render: (_, { tag: tags }: any) => (
        <>
          {tags.map((tagId: any) => {
            const tag = tagColection?.dataTag.find(
              (item: any) => item._id == tagId
            );

            if (tag) {
              return <Tag>{tag.name}</Tag>;
            }
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { key: id }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/projects/update/${id}`}>
              <EditOutlined />
            </Link>
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() =>
              remove(id).then(() =>
                message.success({
                  content: "Đã xóa project thành công!",
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
        <Button>
          <Link to={"add"}>Create</Link>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 3,
        }}
      />
    </>
  );
};
export default AdminProject;
