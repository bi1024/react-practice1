import { useEffect, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Form, Input, InputNumber } from "antd";
const { TextArea } = Input;

import { ModalContext } from "../context";
import { editProduct } from "../services/services";

import { PropTypes } from "prop-types";
import { getAndSaveInputToSession } from "../utils/product";
import { memo } from "react";

const ProductModal = ({ text, onSubmit, product }) => {
  const tempProduct = getAndSaveInputToSession(product);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  //hooks

  useEffect(() => {
    form.setFieldsValue({
      title: tempProduct.title,
      description: tempProduct.description,
      category: tempProduct.category,
      price: tempProduct.price,
    });
  }, [form, tempProduct]);

  const mutation = useMutation({
    mutationFn: (temp) => {
      onSubmit(temp);
      sessionStorage.removeItem("product");
    },

    onSuccess: () => {
      console.log("mutated");
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
      temp.id = tempProduct.id;
    }
    temp.price = parseFloat(values.price);
    mutation.mutate(temp);
    setIsModalOpen(false);
  };

  const onValuesChange = (changedValues, allValues) => {
    allValues.id = tempProduct.id;
    sessionStorage.setItem("product", JSON.stringify(allValues));
  };

  return (
    <>
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
            title: tempProduct.title,
            description: tempProduct.description,
            category: tempProduct.category,
            price: tempProduct.price,
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
          onValuesChange={onValuesChange}
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
    </>
  );
};

export default memo(ProductModal);

ProductModal.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  product: PropTypes.object,
};
