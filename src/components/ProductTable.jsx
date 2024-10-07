import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useImperativeHandle, useContext } from "react";
import { memo, lazy, forwardRef } from "react";
import {
  deleteProductById,
  editProduct,
  fetchProductsInCategoryWithPagination,
} from "../services/services";

import { Suspense } from "react";
import { Space, Table } from "antd";
import { PropTypes } from "prop-types";
import { CategoryContext, ModalContext } from "../context";
const ProductModal = lazy(() => import("../components/ProductModal.jsx"));

//Todo: Implement react query's paginated option
const ProductTable = forwardRef(({ onModalSubmit }, ref) => {
  const { filterCategory } = useContext(CategoryContext);
  const [editingProduct, setEditingProduct] = useState({});
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  useImperativeHandle(
    ref,
    () => {
      return {
        setEditingProduct,
      };
    },
    []
  );
  const { data, isSuccess } = useQuery({
    queryKey: ["products", filterCategory, tableParams.pagination],
    queryFn: () => {
      return fetchProductsInCategoryWithPagination(
        filterCategory,
        tableParams.pagination.current,
        10
      );
    },
    initialData: [], //for not reading empty data
  });
  useEffect(() => {
    if (isSuccess && data) {
      setTableParams((prevParams) => ({
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          total: data.headers, // Assuming totalCount comes from server (header or response)
        },
      }));
    }
  }, [isSuccess, data]);

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

  const handleDelete = (id) => {
    deleteProductById(id);
  };

  const handleEdit = (id) => {
    console.log(data.result);
    setEditingProduct(data.result.find((product) => product.id == id));
    onModalSubmit.current = editProduct;
    setIsModalOpen(true);
  };

  // const handleAddProductClick = () => {
  //   onModalSubmit.current = addProduct;
  //   setEditingProduct({});
  //   setIsModalOpen(true);
  // };

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
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      {isModalOpen && (
        <Suspense>
          <ProductModal
            text="Add a product"
            onSubmit={onModalSubmit.current}
            product={editingProduct}
          ></ProductModal>
        </Suspense>
      )}
      <Table
        columns={columns}
        dataSource={data.result}
        onChange={handleTableChange}
        rowKey="id"
        pagination={tableParams.pagination}
        //rowKey to temporarily suppress react key warning ^
        />
    </>
  );
});

ProductTable.displayName = "ProductTable";
export default memo(ProductTable);

ProductTable.propTypes = {
  data: PropTypes.array,
  onModalSubmit: PropTypes.object,
};
