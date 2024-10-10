import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useState, useEffect, useImperativeHandle, useContext } from "react";

import { memo, lazy, forwardRef } from "react";
import {
  deleteProductById,
  editProduct,
  fetchProductsInCategoryWithPagination,
} from "../services/services";

import { Suspense } from "react";
import { Space, Table } from "antd";
import { CategoryContext, ModalContext } from "../context";
const ProductModal = lazy(() => import("../components/ProductModal.jsx"));
import Loading from "./Loading";

import { PropTypes } from "prop-types";
import { Spin } from "antd";
import { useProductsQuery } from "../hooks/useProductsQuery.js";

//Todo: Implement react query's paginated option
const ProductTable = forwardRef(({ onModalSubmit }, ref) => {
  const { filterCategory } = useContext(CategoryContext);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const [editingProduct, setEditingProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const isFetching = useIsFetching({ queryKey: ["products"] });

  const { data, isSuccess, isPending, error } = useProductsQuery(
    filterCategory,
    tableParams.pagination.current,
    tableParams.pagination.pageSize
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        setEditingProduct,
        setProductId,
      };
    },
    []
  ); //expose setEditingProduct to parent

  useEffect(() => {
    if (isSuccess && data) {
      setTableParams((prevParams) => ({
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          current: data.page,
          pageSize: data.limit,
          total: data.totalCount,
        },
      }));
    }
  }, [isSuccess, data]);

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

  const handleTableChange = (pagination) => {
    console.log("🚀 ~ handleTableChange ~ pagination:", pagination);
    setTableParams({
      pagination: {
        ...pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  const handleDelete = (id) => {
    deleteProductById(id);
  };

  const handleEdit = (id) => {
    //Todo:use more appropriate name
    console.log(data?.items);
    setEditingProduct(data?.items.find((product) => product.id == id));
    setProductId(id);
    onModalSubmit.current = editProduct;
    setIsModalOpen(true);
  };

  //table layout variable
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
  console.log(isPending);
  return (
    <>
      <Suspense fallback={<Loading />}>
        {isModalOpen && (
          <Suspense>
            <ProductModal
              productId={productId}
              text="Add a product"
              onSubmit={onModalSubmit.current}
              product={editingProduct}
            ></ProductModal>
          </Suspense>
        )}
        <Spin size="medium" spinning={isFetching} tip="Fetching data...">
          <Table
            columns={columns}
            dataSource={[...(data?.items || [])]}
            onChange={handleTableChange}
            rowKey={(record) => record.id}
            pagination={{
              current: tableParams.pagination.current,
              pageSize: tableParams.pagination.pageSize,
              total: tableParams.pagination.total,
              position: ["topRight", "bottomRight"],
              pageSizeOptions: [5, 10, 20, 50, 100],
              showSizeChanger: true,
              showTotal: (total, range) => (
                <b>{`showing ${range[0]}-${range[1]} of ${total} entries`}</b>
              ),
              size: "small",
            }}
            //rowKey to temporarily suppress react key warning ^
          />
        </Spin>
      </Suspense>
    </>
  );
});

ProductTable.displayName = "ProductTable";
export default memo(ProductTable);

ProductTable.propTypes = {
  data: PropTypes.array,
  onModalSubmit: PropTypes.object,
};
