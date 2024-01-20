const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = async (req, res) => {
  const products = req.body.products;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "EUR",
      product_data: {
        name: product.productName,
        images: [product.image],
      },
      unit_amount:
        (product.discountPrice == null
          ? product.price
          : product.discountPrice) * 100,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-error",
    });

    res.status(200).send({ id: session.id });
  } catch (error) {
    res.status(502).send({ id: null });
  }
};
