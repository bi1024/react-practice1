import { useState, useEffect, forwardRef } from "react";
import { PropTypes } from "prop-types";

const EditInput = forwardRef(({ onSubmit, product }, ref) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    //try using initials value of antd's form instead
    setId(product.id);
    setTitle(product.title);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    product.title = title;
    product.description = description;
    product.category = category;
    product.price = price;
    onSubmit(product);
  };

  return (

    <form onSubmit={handleSubmit}>
      <input value={id} readOnly></input>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={ref}
      ></input>
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
});
EditInput.displayName = "EditInput"; //to follow eslint's rule
export default EditInput;
// let it be known prop types is only done to appease the eslint god
EditInput.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
};
