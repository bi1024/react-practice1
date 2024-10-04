import { Select } from "antd";
import { PropTypes } from "prop-types";
import { memo } from "react";
import { fetchCategories } from "../services/services";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CategoryContext } from "../context";

const DropdownSelect = () => {
  const { dispatch } = useContext(CategoryContext);

  //!Static categories, does not change on adding to products
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    initialData: [], //for not reading empty data
  });

  const categoriesList = [];
  categories?.forEach((category) =>
    categoriesList.push({ label: category, value: category })
  );
  return (
    <Select
      allowClear
      defaultValue=""
      style={{
        width: 120,
      }}
      onChange={(value) => {
        dispatch({ type: "changed", filterCategory: value });
      }}
      options={categoriesList}
    />
  );
};

export default memo(DropdownSelect);

DropdownSelect.propTypes = {
  categories: PropTypes.array,
  handleFilterChoice: PropTypes.func,
};
