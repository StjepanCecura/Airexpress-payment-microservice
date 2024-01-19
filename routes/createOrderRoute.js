const { commercetoolsClient } = require("../utils/commercetools.js");

module.exports = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const version = req.body.version;

    const order = await commercetoolsClient.execute({
      method: "POST",
      uri: `/airexpress/orders`,
      body: {
        cart: {
          id: cartId,
          typeId: "cart",
        },
        version,
        shipmentState: "Pending",
        paymentState: "Pending",
      },
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(`Error creating order! ${error}`);
    res.status(503).send({ error });
  }
};
