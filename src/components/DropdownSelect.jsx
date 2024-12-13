import { memo } from "react";

import { Select, Spin } from "antd";
import { Suspense } from "react";

import { PropTypes } from "prop-types";
import useStoreBase from "../store";
import { useCategoriesQuery } from "../hooks/useCategoriesQuery";

const DropdownSelect = () => {
  // const { dispatch } = useContext(CategoryContext);
  const changed = useStoreBase.use.changed();

  //!Static categories, does not change on adding to products
  const { data, isSuccess, isPending, error } = useCategoriesQuery();

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
        options={data}
      />
    </Suspense>
  );
};

export default memo(DropdownSelect);

DropdownSelect.propTypes = {
  categories: PropTypes.array,
  handleFilterChoice: PropTypes.func,
};
