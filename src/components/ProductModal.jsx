import { useEffect, useContext } from "react";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { memo } from "react";
import { editProduct } from "../services/services";
// import { getAndSaveInputToSession } from "../utils/product";

import { Button, Modal, Form, Input, InputNumber } from "antd";
const { TextArea } = Input;
import { Suspense } from "react";
import Loading from "./Loading";

import { ModalContext } from "../context";
import { PropTypes } from "prop-types";
import { Spin } from "antd";
import { useProductQuery } from "../hooks/useProductQuery";

const ProductModal = ({ text, onSubmit, productId }) => {
  const isFetching = useIsFetching({ queryKey: ["product"] });
  // const tempProduct = getAndSaveInputToSession(product);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  //hooks
  const { data, isSuccess, isPending, error } = useProductQuery(
    productId,
    queryClient
  );

  useEffect(() => {
    form.setFieldsValue({
      title: data?.title,
      brand: data?.brand,
      description: data?.description,
      category: data?.category,
      price: data?.price,
      stock: data?.stock,
    });
  }, [form, data]);

  const mutation = useMutation({
    mutationFn: async (temp) => {
      await onSubmit(temp);
      sessionStorage.removeItem("product");
    },

    onSuccess: async () => {
      // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      // await delay(1000);
      // //!Artificially delayed^
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["products"],
    //   });
    // },
  });

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    let temp = values;
    if (onSubmit === editProduct) {
      temp.id = data?.id;
    }

    temp.price = parseFloat(values.price);
    mutation.mutate(temp);
    setIsModalOpen(false);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Modal
          title={text}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={handleModalSubmit}>
              Submit
            </Button>,
          ]}
        >
          <Spin size="medium" spinning={isFetching} tip="Fetching data...">
            <Form
              initialValues={{
                title: data?.title,
                description: data?.description,
                category: data?.category,
                price: data?.price,
              }}
              form={form}
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                maxWidth: 600,
              }}
              onFinish={onFinish}
              // onValuesChange={onValuesChange}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input your title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: "Please input your brand" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your description" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input your category",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true, message: "Please input your stock" }]}
              >
                <InputNumber min={0} />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input your price" }]}
              >
                {/* <Input /> */}

                <InputNumber
                  style={{ width: 200 }}
                  min="0"
                  max="1000000000"
                  step="0.01"
                  stringMode
                />
              </Form.Item>

              <Form.Item
                style={{ display: "none" }} //to preserve submitting on enter
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </Suspense>
    </>
  );
};

export default memo(ProductModal);

ProductModal.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  product: PropTypes.object,
  productId: PropTypes.string,
};
