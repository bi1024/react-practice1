

import { fetchProducts } from "../services/services";


const useFetchProducts = async () => {//Unused hook, not actually a hook
  let isError = false;
  let returnError = {};
  let result = {};

  try {
    const response = await fetchProducts();
    result = await response.json();
  } catch (error) {
    returnError = error;
    isError = true;
    console.log(`Error: ${error}`);
  }
  return { isError, returnError, result }
}

export default useFetchProducts;