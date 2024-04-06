const BASE_URL = "https://dummyjson.com";

export const login = (username, password) => {
  return fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30,
    }),
  }).then((res) => res.json());
};
export const fetchProducts = () => {
  return fetch(`${BASE_URL}/products?limit=0`).then((res) => res.json());
};

export const updateCart = (userId, productId, quantity) => {
  return fetch(`${BASE_URL}/carts/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ userId, products: [{ id: productId, quantity }] }),
  }).then((res) => res.json());
};
export const updateCartQuantity = (userId, productId, quantity) => {
  return fetch(`${BASE_URL}/carts/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      userId,
      products: [{ id: productId, quantity }],
    }),
  }).then((res) => res.json());
};

export const searchProductsByName = (searchTerm) => {
  return fetch(`${BASE_URL}/products/search?q=${searchTerm}&limit=0`).then(
    (res) => res.json()
  );
};

export const searchProductsByCategory = (searchTerm) => {
  return fetch(`${BASE_URL}/products/category/${searchTerm}&limit=0`).then(
    (res) => res.json()
  );
};

export const getCategories = () => {
  return fetch(`${BASE_URL}/products/categories`).then((res) => res.json());
};
