const apiUrl = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiUrl}/products`);
        return response.json();
    } catch (error) {//supposed to catch error but no back end to throw error
        console.log(`Error: ${error}`);
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
        let fetchResponse = await fetch(`${apiUrl}/products/${product.id}`);
        fetchResponse = await fetchResponse.json();

        fetchResponse.title = product.title;
        fetchResponse.description = product.description;
        fetchResponse.category = product.category;
        fetchResponse.price = product.price;

        let patchResponse = await fetch(`${apiUrl}/products/${fetchResponse.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchResponse)
        });
        return patchResponse.json();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}