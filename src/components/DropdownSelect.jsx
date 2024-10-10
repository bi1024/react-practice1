import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { memo } from "react";
import { fetchCategories } from "../services/services";

import { Select } from "antd";
import Loading from "./Loading";
import { Suspense } from "react";

import { CategoryContext } from "../context";
import { PropTypes } from "prop-types";

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
    categoriesList.push({ label: category.name, value: category.name })
  );
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default memo(DropdownSelect);

DropdownSelect.propTypes = {
  categories: PropTypes.array,
  handleFilterChoice: PropTypes.func,
};
