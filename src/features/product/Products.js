import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ProductHeader";
import Footer from "../../components/ProductFooter";
import AddToCartButton from "../../components/AddToCartButton";
import "./style/Products.css";
import {
  fetchProducts,
  updateCartQuantity,
  searchProductsByName,
  searchProductsByCategory,
} from "../../api/apiClient";

function Products() {
  const [products, setProducts] = useState([]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.products));
  }, []);

  const handleCartUpdate = (productId, delta) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const productIndex = products.findIndex((p) => p.id === productId);
    const newQuantity = (Number(products[productIndex].quantity) || 0) + delta;
    updateCartQuantity(userId, productId, newQuantity)
      .then(() => {
        const updatedProducts =
          productIndex >= 0
            ? [...products]
            : [...products, { id: productId, addedToCart: true }];

        if (productIndex >= 0) {
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            quantity: newQuantity,
            addedToCart: true,
          };
        }
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };

  const handleSearch = (searchTerm, searchType = "name") => {
    if (searchTerm.trim() === "") {
      fetchProducts().then((data) => setProducts(data.products));
    } else {
      const searchFunction =
        searchType === "category"
          ? searchProductsByCategory
          : searchProductsByName;
      searchFunction(searchTerm).then((data) => setProducts(data.products));
    }
  };
  const onCategorySelect = (category) => {
    handleSearch(category, "category");
  };

  return (
    <>
      <Header onSearch={handleSearch} onCategorySelect={onCategorySelect} />
      <div className="container mt-3">
        <div className="row gx-4 justify-content-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
            >
              <div className="product-card card mb-4">
                <img
                  className="product-thumbnail card-img-top"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{product.title}</h3>
                  <div className="product-description card-text">
                    {product.description}
                  </div>
                  <p className="product-price mt-auto">
                    Price: ${product.price}
                  </p>
                  <AddToCartButton
                    isAdded={product.addedToCart}
                    quantity={product.quantity}
                    onAdd={() => handleCartUpdate(product.id, 1)}
                    onIncrease={() => handleCartUpdate(product.id, 1)}
                    onDecrease={() => handleCartUpdate(product.id, -1)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
