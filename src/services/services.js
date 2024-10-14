// import { getCategories } from "../utils/productList";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${apiUrl}/categories`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let result = await response.json()
    return result;
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];//ensure no reading of undefined => page isn't borked
  }
}

export const fetchProductsInCategory = async (category) => {
  try {
    if (category && category.length > 0) {
      const response = await fetch(`${apiUrl}/products?category=${category}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = await response.json()
      return result;
    } else { return fetchProducts() }
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];//ensure no reading of undefined => page isn't borked
  }
}

export const fetchProductsInCategoryWithPagination = async (
  category,
  page,
  limit
) => {
  try {
    const baseURL = `${apiUrl}/products?_page=${page}&_limit=${limit}${category ? `&category=${category}` : ''
      }`;

    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    // Fetch total count separately
    const countResponse = await fetch(
      `${apiUrl}/products${category ? `?category=${category}` : ''}`
    );
    if (!countResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const allItems = await countResponse.json();
    const totalCount = allItems.length;

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000);
    // //!Artificially delayed^

    return {
      items: result,
      totalCount: totalCount,
      page: page,
      limit: limit,
    };
  } catch (error) {
    console.error(`Error: ${error}`);
    return {
      items: [],
      totalCount: 0,
      page: page,
      limit: limit,
    };
  }
};

export const fetchProducts = async (
  category,
  page,
  limit,
  priceSorter
) => {
  try {
    const baseURL = `${apiUrl}/products?${page ? `&_page=${category}` : ''}${limit ? `&_limit=${category}` : ''}${category ? `&category=${category}` : ''}${priceSorter ? `&_sort=price&_order=${priceSorter}` : ''}`;

    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    // Fetch total count separately
    const countResponse = await fetch(
      `${apiUrl}/products${category ? `?category=${category}` : ''}`
    );
    if (!countResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const allItems = await countResponse.json();
    const totalCount = allItems.length;

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000);
    // //!Artificially delayed^

    return {
      items: result,
      totalCount: totalCount,
      page: page,
      limit: limit,
    };
  } catch (error) {
    console.error(`Error: ${error}`);
    return {
      items: [],
      totalCount: 0,
      page: page,
      limit: limit,
    };
  }
};



export const fetchProductById = async (id) => {
  try {

    const response = await fetch(`${apiUrl}/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let result = await response.json()
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000);
    // //!Artificially delayed^
    return result;
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];//ensure no reading of undefined => page isn't borked
  }
}


export const deleteProductById = async (productId) => {
  try {
    const response = await fetch(`${apiUrl}/products/${productId}`, {
      method: 'DELETE'
    })
    return response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export const editProduct = async (product) => {
  try {
    let patchResponse = await fetch(`${apiUrl}/products/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    return patchResponse.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export const addProduct = async (product) => {
  try {
    const response = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    return response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

