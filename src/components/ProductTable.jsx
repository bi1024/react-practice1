import { Space, Table } from "antd";
import { memo } from "react";
import { PropTypes } from "prop-types";

// List = memo(function List({ items })
const ProductTable = ({
  data,
  handleDelete,
  handleEdit,
}) =>{
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
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
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleEdit(product.id);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              handleDelete(product.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default memo(ProductTable);
// let it be known prop types is only done to appease the eslint god
ProductTable.propTypes = {
  data: PropTypes.array,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};
