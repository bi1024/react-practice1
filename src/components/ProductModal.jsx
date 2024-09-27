import { Button, Modal } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { editProduct } from "../services/services";
import { useEffect } from "react";
import { PropTypes } from "prop-types";

const ProductModal = ({
  text,
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  setToggle, //triggers re-render
  toggle,
  product,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
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
    if (onSubmit === editProduct) {
      values.id = product.id;
    }
    onSubmit(values, toggle, setToggle);
    setIsModalOpen(false);
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
            <Input />
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
            <Input />
          </Form.Item>

          <Form.Item
            style={{ display: "none" }}
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
  setToggle: PropTypes.func,
  toggle: PropTypes.bool,
  product: PropTypes.object,
};
