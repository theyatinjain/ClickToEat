import React from 'react'
import styles from './Cart.module.css';
import Modal from '../UI/Modal';

function Cart(props) {
    const cartItems = [{
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    }].map(item => <li key={item.id}>{item.name}</li>);

    return (
        <Modal onClose={props.onClose} >
            <ul className={styles.cartItems}>
                {cartItems}
            </ul>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>$35.62</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose} >Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart