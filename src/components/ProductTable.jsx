import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { Space, Table } from "antd";
import { PropTypes } from "prop-types";

// List = memo(function List({ items })
const ProductTable = ({ data, handleDelete, handleEdit }) => {
  //hooks
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      handleDelete(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        refetchType: "all",
      });
    },
  });

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
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
          {/* <Link to={product.id}>Details</Link> */}
          <a
            onClick={() => {
              handleEdit(product.id);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              mutation.mutate(product.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["products"],
                    refetchType: "all",
                  });
                },
                //!^redundant onSuccess(already done in useMutation) but reduce faulty fetching (unsolved) when deleting multiple items continuously
              });
              // handleDelete(product.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} rowKey="id" />;
  //rowKey to temporarily suppress react key warning ^
};

export default memo(ProductTable);

ProductTable.propTypes = {
  data: PropTypes.array,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};
