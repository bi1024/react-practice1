import { Select } from "antd";
import { PropTypes } from "prop-types";

const DropdownSelect = ({ categories, handleFilterChoice }) => {
  const categoriesList = [];
  categories.forEach((category) =>
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
export default DropdownSelect;

DropdownSelect.propTypes = {
  categories: PropTypes.array,
  handleFilterChoice: PropTypes.func,
};
