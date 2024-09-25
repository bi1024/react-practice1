import { useState } from "react";
// import { Form, Input, Button } from "antd";
import { useEffect } from "react";

const EditInput = ({ onSubmit, product }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    setId(product.id);
    setTitle(product.title);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
  }, [product]);

  const handleSubmit = () => {
    product.title = title;
    product.description = description;
    product.category = category;
    product.price = price;
    onSubmit(product);
  };

  return (
    // Em dùng html vì em tốn ~ hơn 1 tiếng vô form của ant design mà làm không được =)))
    <form onSubmit={handleSubmit}>
      <input value={id}></input>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      <input value={price} onChange={(e) => setPrice(e.target.value)}></input>
      <input type="submit" />
    </form>
  );
};

export default EditInput;
