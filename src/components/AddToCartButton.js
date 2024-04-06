import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddToCartButton = ({
  isAdded,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}) => {
  return isAdded && quantity > 0 ? (
    <div className="d-flex align-items-center justify-content-center">
      <FontAwesomeIcon
        icon={faMinusCircle}
        onClick={onDecrease}
        style={{ cursor: "pointer" }}
      />
      <span className="mx-2">{quantity}</span>
      <FontAwesomeIcon
        icon={faPlusCircle}
        onClick={onIncrease}
        style={{ cursor: "pointer" }}
      />
    </div>
  ) : (
    <button onClick={onAdd} className="add-to-cart-button btn btn-primary mt-2">
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
