const apiUrl = import.meta.env.VITE_API_URL;



export const fetchProducts = async () => {
  try {

    const response = await fetch(`${apiUrl}/products`);
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


export const fetchProductById = async (id) => {
  try {

    const response = await fetch(`${apiUrl}/products/${id}`);
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