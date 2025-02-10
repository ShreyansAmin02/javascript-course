export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); // adds order to the front of the array instead of the back
  saveToStorage();
}
export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}