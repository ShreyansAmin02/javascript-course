import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";

// import '../data/backend-practice.js';

import { cart } from '../data/cart-class.js';

async function loadPage() {
  try {
    // throw 'error1';

    await Promise.all([
      loadProductsFetch(),
      cart.loadCartFetch()
    ]);

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();

/*

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((values) => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1'); // first load products, then 
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  // load the page elements 

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });

});
*/