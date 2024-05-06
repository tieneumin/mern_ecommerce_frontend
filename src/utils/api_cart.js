export const addCartItem = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = [];
  const cartItemIndex = cart.findIndex((i) => {
    return i._id === product._id;
  });
  if (cartItemIndex == -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[cartItemIndex].quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};

export const deleteCartItem = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  const newCart = cart.filter((i) => i._id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
};
