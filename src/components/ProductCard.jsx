import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
const { Text, Link } = Typography;
import { Rate } from "antd";
import { Card } from "antd";
import { useProductQuery } from "../hooks/useProductQuery";
const { Meta } = Card;

const ProductCard = ({ productId }) => {
  const { data, isSuccess, isPending, error } = useProductQuery(productId);
  console.log(data.thumbnail);
  return (
    <Card
      loading={isPending}
      cover={<img alt="example" src={data.thumbnail} />}
      actions={[
        <HeartOutlined key="favorite" />,
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {/* <Title level={5}>Horn it is</Title> */}
      <Meta title={data.title} description={data.description} />
      <Rate allowHalf defaultValue={2.5} />
      <br />

      <Text>3650 </Text>
      <Text delete>3650</Text>
      {/* <Button type="primary" block>
      Add to cart
    </Button> */}
    </Card>
  );
};

export default ProductCard;
