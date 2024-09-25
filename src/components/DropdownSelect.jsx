import { Select } from "antd";

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
      options={categoriesList }
    />
  );
};
export default DropdownSelect;
// <Select
//                 allowClear
//                 defaultValue=""
//                 style={{
//                   width: 120,
//                 }}
//                 onChange={(value) => {
//                   handleFilterChoice(value);
//                 }}
//                 options={[
//                   {
//                     value: "beauty",
//                     label: "Beauty",
//                   },
//                   {
//                     value: "fragrances",
//                     label: "Fragrances",
//                   },
//                   {
//                     value: "furniture",
//                     label: "Furniture",
//                   },
//                   {
//                     value: "groceries",
//                     label: "Groceries",
//                     // disabled: true,
//                   },
//                 ]}
//               />
