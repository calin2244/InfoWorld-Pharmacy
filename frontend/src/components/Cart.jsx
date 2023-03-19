import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../stylesheets/Cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart); //from the store

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p className="cart-state">Your shopping cart is empty.</p>
          <div className="back-to-shop">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
              <span>Go back</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="med-name">Medicament</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total-price-med">Total Price</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-med">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button className="remove-med-button">Remove item</button>
                  </div>
                </div>
                <div className="cart-item-price">{item.price} RON</div>
                <div className="cart-item-quantity">
                  <button>-</button>
                  <div className="count">{item.quantity}</div>
                  <button>+</button>
                </div>
                <div className="cart-item-total-price">
                  {item.price * item.quantity} RON
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart">Clear Cart</button>
            <div className="cart-checkout">
              <div className="total-price">
                <span>Total Price</span>
                <span className="amount">
                  {cart.cartItems.reduce(
                    (acc, curr) => (acc += curr.price * curr.quantity),0)}{" "}
                  RON
                </span>
                <button className="checkout-button">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
