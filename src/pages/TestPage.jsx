import ProductLayout from "../layout/ProductLayout";
import { Button, Card } from "antd";
const { Meta } = Card;
import { Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Typography } from "antd";
const { Title } = Typography;
const { Text, Link } = Typography;

import { Rate } from "antd";
import ProductCard from "../components/ProductCard";

const TestPage = () => {
  return (
    <ProductLayout>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            cover={
              <img
                alt="example"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/French_horn_front.png/800px-French_horn_front.png"
              />
            }
            actions={[
              <HeartOutlined />,
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            {/* <Title level={5}>Horn it is</Title> */}
            <Meta title="Horn it is" description="It's a horn." />
            <Rate allowHalf defaultValue={2.5} />
            <br />

            <Text>3650 </Text>
            <Text delete>3650</Text>
            {/* <Button type="primary" block>
              Add to cart
            </Button> */}
          </Card>
        </Col>
        <Col span={6}>
          <ProductCard productId={"6"}></ProductCard>
        </Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
    </ProductLayout>
  );
};

export default TestPage;
