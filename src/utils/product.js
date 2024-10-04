export const getAndSaveInputToSession = (product) => {
  if (sessionStorage.product) {
    let data = JSON.parse(sessionStorage.product);
    if (data && data.id == product.id) {
      return data;
    } else {
      sessionStorage.setItem("product", JSON.stringify(product));
    }
  }
  return product;
}