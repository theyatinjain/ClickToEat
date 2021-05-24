import React from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props) {
    return (
        <form className={styles.form}>
            <Input label="Quantity" input={{
                id: 'qty_'+ props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1' }} 
            />
            <button type="submit">+ Add</button>
        </form>
    )
}

export default MealItemForm;