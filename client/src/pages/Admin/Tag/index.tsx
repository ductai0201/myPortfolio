import React from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetAllTagQuery, useRemoveTagMutation } from "@/api/Tag";
interface DataType {
  key: string;
  name: string;
}
interface ITag {
    _id?: string,
    name?: string
    project?: string[]
}
const AdminTag: React.FC = () => {
  const { data }: any = useGetAllTagQuery();
  const [remove] = useRemoveTagMutation();

  const dataSource = data?.dataTag.map((item: ITag) => ({
    key: item._id,
    name: item.name,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Tag Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { key: id }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/tags/update/${id}`}>
              <EditOutlined />
            </Link>
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() =>
              remove(id).then(() =>
                message.success({
                  content: "Đã xóa tag thành công!",
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
export default AdminTag;
