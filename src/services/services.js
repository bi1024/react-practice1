const apiUrl = import.meta.env.VITE_API_URL;

const refetch = (toggle, setToggle) => {
    setToggle(!toggle);
}

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiUrl}/products`);
        return response.json();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


export const deleteProductById = async (productId, toggle, setToggle) => {
    try {
        const response = await fetch(`${apiUrl}/products/${productId}`, {
            method: 'DELETE'
        })
        refetch(toggle, setToggle);
        return response.json();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export const editProduct = async (product, toggle, setToggle) => {
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
        refetch(toggle, setToggle)
        return patchResponse.json();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export const addProduct = async (product, toggle, setToggle) => {
    try {
        const response = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        refetch(toggle, setToggle);
        return response.json();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}