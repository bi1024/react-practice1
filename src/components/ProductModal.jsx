import { useEffect, useContext } from "react";
import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { memo } from "react";
import { editProduct, fetchProductById } from "../services/services";
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
  console.log(productId);
  const isFetching = useIsFetching({ queryKey: ["product"] });
  // const tempProduct = getAndSaveInputToSession(product);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  //hooks
  const { data, isSuccess, isPending, error } = useProductQuery(productId);
 
  console.log(data);
  useEffect(() => {
    form.setFieldsValue({
      title: data?.title,
      description: data?.description,
      category: data?.category,
      price: data?.price,
    });
  }, [form, data]);

  const mutation = useMutation({
    mutationFn: (temp) => {
      onSubmit(temp);
      sessionStorage.removeItem("product");
    },

    onSuccess: () => {
      console.log("mutated");
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
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
    console.log(temp);
    temp.price = parseFloat(values.price);
    mutation.mutate(temp);
    setIsModalOpen(false);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Spin size="medium" spinning={isFetching} tip="Fetching data...">
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
                shouldUpdate
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your title",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.description !== curValues.description
                }
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your description",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.category !== curValues.category
                }
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
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.price !== curValues.price
                }
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your price",
                  },
                ]}
              >
                {/* <Input /> */}

                <InputNumber
                  style={{
                    width: 200,
                  }}
                  // defaultValue="1"
                  min="0"
                  max="1000000000"
                  step="0.01"
                  // onChange={onChange}
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
          </Modal>
        </Spin>
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
