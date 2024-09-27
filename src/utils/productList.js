
export const getCategories = (list) => {
    const tempCategories = list.reduce((result, current) => {
        if (result.indexOf(current.category) === -1) {
            result.push(current.category)
        }
        return result;
    }, [])
    return tempCategories;
}
export const filterListByCategory = (list, category) => {
    if (category && category.length != 0) {
        return (list.filter((item) => item.category === category));
    } else {
        return list;
    }
}

export const updateLocalList = (list, data) => {
    return (list.map((product) =>
        product.id == data.id
            ? {
                ...product,
                title: data.title,
                description: data.description,
                category: data.category,
                price: data.price,
            }
            : product
    ))
}


