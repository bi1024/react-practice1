import { Select } from "antd";
import { PropTypes } from "prop-types";
import { memo } from "react";

const DropdownSelect = ({ categories, handleFilterChoice }) => {
  const categoriesList = [];
  //!memo?
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
        handleFilterChoice(value);
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
