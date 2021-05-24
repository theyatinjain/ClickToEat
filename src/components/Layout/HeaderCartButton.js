import React, { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {
    const [btnAnimation, setBtnAnimation] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((currNumber, item) => currNumber + item.quantity, 0);
    const btnClasses = `${styles.button} ${btnAnimation ? styles.bump : ''}`;
    useEffect(() => {
        if(items.length===0) return;
        setBtnAnimation(true);
        const timer = setTimeout(() => setBtnAnimation(false), 300);
        return () => clearTimeout(timer);
    }, [items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;