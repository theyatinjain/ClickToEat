import React, { Fragment, useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const addCartItemHandler = (item) => cartCtx.addItem({ ...item, quantity: 1 });
  const removeCartItemHandler = (id) => cartCtx.removeItem(id);

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      onAdd={addCartItemHandler.bind(null, item)}
      onRemove={removeCartItemHandler.bind(null, item.id)}
    />
  ));

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    const response = await fetch('https://clicktoeat77-default-rtdb.firebaseio.com/order.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItem: cartCtx.items
      })
    });
    if (!response.ok) console.log(response);
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartModalContent = <Fragment>
    <ul className={styles.cartItems}>{cartItems}</ul>
    <div className={styles.total}>
      <span>Total Amount</span>
      <span>$ {`${cartCtx.totalAmount.toFixed(2)}`}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
    {!isCheckout && <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
        </button>
      {cartCtx.items.length > 0 && (
        <button className={styles.button} onClick={orderHandler}>Order</button>
      )}
    </div>}
  </Fragment>
  return (
    <Modal onClose={props.onClose}>
      {(!isSubmitting && !didSubmit) && cartModalContent}
      {isSubmitting && <p>Sending Order Details</p>}
      {(!isSubmitting && didSubmit) &&
        <Fragment>
          <p>Successfully sent the order!</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={props.onClose}>Close</button>
          </div>
        </Fragment>}
    </Modal>
  );
}

export default Cart;
