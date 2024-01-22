const { commercetoolsClient } = require("../utils/commercetools.js");
const { generateReceipt } = require("../utils/functions.js");

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
        paymentState: "Paid",
      },
    });

    generateReceipt(order);

    const lineItems = order.body.lineItems;

    const newQuantities = lineItems.map((lineItem) => ({
      inventoryId:
        lineItem.variant.availability.channels[
          "9fce1ee9-e108-4654-a6b4-0f74a1008dc8"
        ].id,
      version:
        lineItem.variant.availability.channels[
          "9fce1ee9-e108-4654-a6b4-0f74a1008dc8"
        ].version,
      removedQuantity: lineItem.quantity,
    }));

    newQuantities.forEach(async (quantity) => {
      const updatedInventory = await commercetoolsClient.execute({
        method: "POST",
        uri: `/airexpress/inventory/${quantity.inventoryId}`,
        body: {
          version: quantity.version,
          actions: [
            {
              action: "removeQuantity",
              quantity: quantity.removedQuantity,
            },
          ],
        },
      });
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(`Error creating order! ${error}`);
    res.status(503).send({ error });
  }
};
