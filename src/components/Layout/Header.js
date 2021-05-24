import React, { Fragment } from 'react';
import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>ClickToEat</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={styles.mainImage} >
                <img src={mealsImage} alt="table full of meals"  />
            </div>
        </Fragment>
    )
}

export default Header;