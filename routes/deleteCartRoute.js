const { commercetoolsClient } = require("../utils/commercetools.js");

module.exports = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const cartVersion = req.body.cartVersion;

    const cart = await commercetoolsClient.execute({
      method: "DELETE",
      uri: `/airexpress/carts/${cartId}?version=${cartVersion}`,
    });

    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(`Error while fetching cart data by card id! error:${error}`);
    res.status(400).send({ success: false, error });
  }
};
