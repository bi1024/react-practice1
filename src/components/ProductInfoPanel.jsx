import { Form } from "antd";
import { Input, InputNumber, Button, Space } from "antd";
import { useEffect } from "react";
const { TextArea } = Input;
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//!Unused Component

const ProductInfoPanel = ({ product, onSubmit }) => {
  const [form] = Form.useForm();
  let data = JSON.parse(sessionStorage.product);
  if (data && data.id == product.id) {
    product = data;
  } else {
    sessionStorage.setItem("product", JSON.stringify(product));
  }
  console.log(data);
  // sessionStorage.setItem("product", product);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (temp) => {
      console.log(temp);
      onSubmit(temp);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onFinish = (values) => {
    let temp = values;
    temp.id = product.id;

    temp.price = parseFloat(values.price);
    mutation.mutate(temp);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onValuesChange = (changedValues, allValues) => {
    allValues.id = product.id;
    console.log(allValues);
    sessionStorage.setItem("product", JSON.stringify(allValues));
  };
  // const onSubmit = () => {};
  // const onFinish = (values) => {
  //   let temp = values;
  //   if (onSubmit === editProduct) {
  //     temp.id = product.id;
  //   }
  //   temp.price = parseFloat(values.price);
  //   mutation.mutate(temp);
  //   setIsModalOpen(false);
  // };

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
    <div>
      <Form
        {...layout}
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
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              Submit
            </Button>
            <Link to="/products">
              <Button htmlType="button">Cancel</Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductInfoPanel;

ProductInfoPanel.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
};
