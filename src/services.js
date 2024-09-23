import axios from "../../react-login/src/api/axios";



export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/products');
        return response.data;
    } catch (error) {//supposed to catch error but no back end to throw error
        console.log(`Error: ${error}`);
    }
}

