// Represents a shopping Cart
class Cart {
  cartItems;
  #localStorageKey; // the # makes it a private property

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]; // default cart
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem = '';

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = quantitySelector ? Number(quantitySelector.value) : 1;

    if (quantitySelector) {
      quantitySelector.value = 1;
    }

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.saveToStorage();
  }

  calculateCartQuantity() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }

  updateQuanity(productId, newQuantity) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  async loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const data = await response.text();
    console.log(`18h ${data}`);
    return response;
  }

  loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }
  clearCart() {
    this.cartItems = [];
    this.saveToStorage();
  }
};

// Usage
export const cart = new Cart('cart-oop'); // loads and saves to localStorage with key 'cart-oop'
const businessCart = new Cart('cart-business'); // loads and saves to localStorage with key 'cart-business'
