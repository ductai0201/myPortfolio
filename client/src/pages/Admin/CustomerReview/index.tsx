import React from "react";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IReview } from "@/interfaces/Review";
import { useGetAllReviewQuery, useRemoveReviewMutation } from "@/api/Review";
interface DataType {
  key: string;
  name: string;
  gallery: string;
  content: string
}
const AdminCustomerReview: React.FC = () => {
  const { data }: any = useGetAllReviewQuery();
  const [remove] = useRemoveReviewMutation();

  const dataSource = data?.dataReview.map((item: IReview) => ({
    key: item._id,
    name: item.name,
    gallery: item.gallery,
    content: item.content
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Customer Name",
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
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { key: id }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/reviews/update/${id}`}>
              <EditOutlined />
            </Link>
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() =>
              remove(id).then(() =>
                message.success({
                  content: "Đã xóa customer review thành công!",
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
          pageSize: 2,
        }}
      />
    </>
  );
};
export default AdminCustomerReview;
