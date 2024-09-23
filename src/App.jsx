import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import productsData from "./data/products.json";
import { fetchProducts } from "./services";

function App() {
  //em tạm thời chưa dùng json-server/mockapi
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState(productsData.products);
  const [filteredList, setFilteredList] = useState(productsData.products);

  //react hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setList(
      list.map((product) =>
        product.id == data.id
          ? {
              ...product,
              title: data.title,
              description: data.description,
              category: data.category,
              price: data.price,
            }
          : product
      )
    );
  };

  const handleFilterChoice = (e) => {
    console.log("changed");
    setFilterCategory(e.target.value);
  };

  const handleDelete = (e) => {
    setList(list.filter((product) => product.id != e.target.value));
  };

  const handleEdit = (e) => {
    console.log(e.target.value);
    const temp = list.find((product) => product.id == e.target.value);
    setValue("id", temp.id);
    setValue("title", temp.title);
    setValue("description", temp.description);
    setValue("category", temp.category);
    setValue("price", temp.price);
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      setList(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (filterCategory && filterCategory.length != 0) {
      setFilteredList(list.filter((item) => item.category === filterCategory));
    }
  }, [filterCategory, list]);

  useEffect(() => {
    const tempCategories = [];
    list.forEach((product) => {
      if (tempCategories.indexOf(product.category) === -1) {
        tempCategories.push(product.category);
      }
    });
    setCategories(tempCategories);
  }, [list]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="id"
          defaultValue=""
          value={watch("id")}
          {...register("id")}
        />
        {errors.title && <span>This field is required</span>}

        <input placeholder="title" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}

        <input
          placeholder="description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>This field is required</span>}

        <input
          placeholder="category"
          {...register("category", { required: true })}
        />
        {errors.category && <span>This field is required</span>}

        <input placeholder="price" {...register("price", { required: true })} />
        {errors.price && <span>This field is required</span>}

        <input type="submit" />
      </form>

      {categories}
      <span>chosen: {filterCategory}</span>
      <select name="categories" id="categories" onChange={handleFilterChoice}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {filteredList.map((product) => (
        <>
          <div key={product.id}>
            <button value={product.id} onClick={handleDelete}>
              Delete
            </button>
            <button value={product.id} onClick={handleEdit}>
              Edit
            </button>
            {product.category}
            <br></br>
            {JSON.stringify(product)}
          </div>
          <br />
        </>
      ))}
    </>
  );
}

export default App;
