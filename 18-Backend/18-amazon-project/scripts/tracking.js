import { updateCartQuanity } from "./amazon.js";
import { orders, getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

updateCartQuanity();


async function loadPage() {

  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId'); // gets the order ID out of the URL
  const productId = url.searchParams.get('productId'); // gets the order ID out of the URL
  const order = getOrder(orderId);
  const product = getProduct(productId);
  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });
  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
  const testHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
        Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-info">
        ${product.name}
      </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image js-product-image" src="${product.image}">
      <div class="progress-labels-container">
      <div class="progress-label ${deliveryProgress < 50 ? 'current-status' : ''
    }">
        Preparing
      </div>
      <div class="progress-label ${deliveryProgress >= 50 && deliveryProgress < 100 ? 'current-status' : ''
    } ">
      Shipped
      </div >
  <div class="progress-label ${deliveryProgress >= 100 ? 'current-status' : ''
    }">
    Delivered
  </div>
    </div >
  <div class="progress-bar-container">
    <div class="progress-bar js-progress-bar"></div>
  </div>`;


  document.querySelector('.js-order-tracking').innerHTML = testHtml;

  const progressBar = document.querySelector('.js-progress-bar');

  progressBar.style.width = `${deliveryProgress}% `

}

loadPage();