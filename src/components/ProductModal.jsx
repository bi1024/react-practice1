import { Button, Modal, Form, Input, InputNumber } from "antd";
const { TextArea } = Input;
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropTypes } from "prop-types";

import { editProduct } from "../services/services";
import { useContext } from "react";
import { ModalContext } from "../context";

const ProductModal = ({
  text,
  // isModalOpen,
  // setIsModalOpen,
  onSubmit,
  product,
}) => {
  //hooks
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (temp) => {
      onSubmit(temp);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  let data = JSON.parse(sessionStorage.product);
  if (data && data.id == product.id) {
    product = data;
  } else {
    sessionStorage.setItem("product", JSON.stringify(product));
  }

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
      temp.id = product.id;
    }
    temp.price = parseFloat(values.price);
    mutation.mutate(temp);
    setIsModalOpen(false);
  };

  const onValuesChange = (changedValues, allValues) => {
    allValues.id = product.id;
    console.log(allValues);
    sessionStorage.setItem("product", JSON.stringify(allValues));
  };

  //hooks
  useEffect(() => {
    form.setFieldsValue({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
    });
  }, [form, product]);

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
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
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

export default ProductModal;

ProductModal.propTypes = {
  text: PropTypes.string,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  onSubmit: PropTypes.func,
  product: PropTypes.object,
};
