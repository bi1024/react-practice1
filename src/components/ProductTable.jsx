import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { Space, Table } from "antd";
import { PropTypes } from "prop-types";
import {
  fetchProductsInCategory,
  fetchProductsInCategoryWithPagination,
} from "../services/services";
import { useContext } from "react";
import { CategoryContext } from "../context";
import { useState } from "react";
import { useEffect } from "react";

// List = memo(function List({ items })
const ProductTable = ({ handleDelete, handleEdit }) => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      // total: data.headers,
    },
  });
  const { filterCategory } = useContext(CategoryContext);
  const { data } = useQuery({
    queryKey: ["products", filterCategory],
    queryFn: () => {
      // console.log("a");
      return fetchProductsInCategoryWithPagination(filterCategory);
    },
    initialData: [], //for not reading empty data
  });
  // useEffect(() => {
  //   setTableParams({
  //     ...tableParams,
  //     pagination: {
  //       ...tableParams.pagination,
  //       total: data.headers,
  //       // 200 is mock data, you should read it from server
  //       // total: data.totalCount,
  //     },
  //   });
  // }, [data, tableParams]);
  //hooks
  // const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  console.log(tableParams);
  const queryClient = useQueryClient();
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    console.log(pagination);
  };
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
  return (
    <Table
      columns={columns}
      dataSource={data.result}
      onChange={handleTableChange}
      rowKey="id"
      pagination={tableParams.pagination}
    />
  );
  //rowKey to temporarily suppress react key warning ^
};

export default memo(ProductTable);

ProductTable.propTypes = {
  data: PropTypes.array,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};
