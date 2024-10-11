import { useQuery } from "@tanstack/react-query";

import { memo } from "react";
import { fetchCategories } from "../services/services";

import { Select, Spin } from "antd";
import { Suspense } from "react";

import { PropTypes } from "prop-types";
import useStoreBase from "../store";

const DropdownSelect = () => {
  // const { dispatch } = useContext(CategoryContext);
  const changed = useStoreBase.use.changed();

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
    <Suspense fallback={<Spin />}>
      <Select
        allowClear
        defaultValue=""
        style={{
          width: 120,
        }}
        onChange={(value) => {
          changed(value);
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
