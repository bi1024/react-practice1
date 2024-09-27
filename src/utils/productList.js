
export const getCategories = (list) => {
    const tempCategories = [];
    list.forEach((product) => {
        if (tempCategories.indexOf(product.category) === -1) {
            tempCategories.push(product.category);
        }
    });
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


