import React, { useRef, useState } from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props) {
    const amountInputRef = useRef();
    const [isQuantityValid, setQuantityIsValid] = useState(true);

    const onSubmitHandler = event => {
        event.preventDefault();
        const enteredQty = amountInputRef.current.value;
        const enteredQtyNumber = +enteredQty;
        if (enteredQty.trim().length === 0 || enteredQtyNumber < 1 || enteredQtyNumber > 5) {
            setQuantityIsValid(false);
            return;
        }
        props.onAddToCart(enteredQtyNumber);
    }
    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <Input
                ref={amountInputRef}
                label="Quantity"
                input={{
                    id: 'qty_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button type="submit">+ Add</button>
            {!isQuantityValid && <p>Please enter a value between 1 and 5</p>}
        </form>
    )
}

export default MealItemForm;