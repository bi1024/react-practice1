import axios from "../../react-login/src/api/axios";



export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/products');
        console.log(response.headers['x-total-count'])
        return response.data;
    } catch (error) {//supposed to catch error but no back end to throw error
        console.log(`Error: ${error}`);
    }
}

export const deleteProductById = async (productId) => {
    try {
        const response = await axios.delete(`http://localhost:3000/products/${productId}`)
        return response.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export const editProduct = async (product) => {
    try {
        console.log(product);
        const response = await axios.get(`http://localhost:3000/products/${product.id}`);
        response.data.title = product.title;
        response.data.description = product.description;
        response.data.category = product.category;
        response.data.price = product.price;
        console.log(response.data);
        await axios.patch(`http://localhost:3000/products/${response.data.id}`, response.data)
        return response.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}