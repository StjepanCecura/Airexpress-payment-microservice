const PDFDocument = require("pdfkit");
const fs = require("fs");

const formatProductsInCart = (products) => {
  const formatedProducts = [];
  products.forEach((product) => {
    formatedProducts.push({
      lineItemId: product.id,
      productId: product.productId,
      productKey: product.productKey,
      productName: product.name["en-US"],
      variantKey: product.variant.key,
      variantId: product.variant.id,
      price: product.variant.prices[0].value.centAmount / 100,
      discountPrice:
        product.variant.prices[0]?.discounted?.value?.centAmount / 100,
      image: product.variant.images[0].url,
      quantity: product.quantity,
    });
  });

  return formatedProducts;
};

const verifyJWT = async (token) => {
  const response = await fetch("http://customer_service:4002/verifyJWT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then(async (response) => {
      const body = await response.json();
      if (response.status == 200)
        return {
          success: true,
          user: {
            id: body.user.id,
            email: body.user.email,
            firstName: body.user.firstName,
            lastName: body.user.lastName,
          },
        };
      else {
        return { success: false };
      }
    })
    .catch((error) => {
      console.log(error);
      return { success: false };
    });

  return response;
};

const sendReceipt = async (order) => {
  const response = await fetch("http://mail_service:4003/sendReceipt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  })
    .then((response) => console.log(response))
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

module.exports = {
  formatProductsInCart,
  verifyJWT,
  sendReceipt,
};
