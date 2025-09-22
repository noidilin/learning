const cart = ["shoes", "pants", "hats"];

function validateCart(cart) {
  return false;
}

function createOrder() {
  return new Promise(function (res, rej) {
    if (!validateCart(cart)) {
      const err = new Error("Cart is not valid");
      rej(err);
    }
    const orderID = "12345";
    if (orderID) {
      setTimeout(function () {
        res(orderID);
      }, 5000);
    }
  });
}

function proceedToPayment(orderInfo) {
  return new Promise(function (res, rej) {
    if (orderInfo) {
      res("Payment Successful");
    } else {
      rej("error");
    }
  });
}

createOrder(cart)
  .then(function (order) {
    console.log(order);
    return order;
  })
  .catch(function (order) { // responsible for all errors happen before it
    console.error(`Warn! There is an error ${order}`);
    return order;
  })
  .then(function (orderID) {
    return proceedToPayment(orderID);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    console.error(err.message);
  })
  .then(function () { // will be invoked as long all error have been handled.
    console.log("No matter what happens, I will definietely be called");
  });
