import { useEffect } from "react";

import { fetchProducts } from "../services/services";


const useFetchProducts = (toggle, setList) => {//Unused hook
    useEffect(() => {

        const fetchProductData = async (signal) => {
            try {
                const response = await fetchProducts(signal);
                setList(response);
            } catch (error) {
                console.log(`Error: ${error}`);
                throw error;
            }
        };

        const abortController = new AbortController();
        fetchProductData(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [toggle, setList]);
}

export default useFetchProducts;