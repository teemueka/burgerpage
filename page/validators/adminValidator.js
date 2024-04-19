const productErrors = (productData) => {
  const {name, price, image} = productData;
  console.log(productData);

  let hasErrors = false;

  if (name.trim() === '') {
    hasErrors = true;
  }
  if (isNaN(price)) {
    hasErrors = true;
  }
  if (image === null || image === undefined) {
    hasErrors = true;
  }

  if (hasErrors) {
    console.log('product information invalid');
    return true;
  } else {
    console.log('yep');
    return false;
  }
};

export {productErrors};
