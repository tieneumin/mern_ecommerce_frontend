export const addCartItem = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = [];
  const cartItemIndex = cart.findIndex((i) => i._id === product._id);
  if (cartItemIndex === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[cartItemIndex].quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart ? cart : [];
};

export const removeCartItem = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter((i) => i._id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
};

export function emptyCart() {
  localStorage.removeItem("cart");
}
