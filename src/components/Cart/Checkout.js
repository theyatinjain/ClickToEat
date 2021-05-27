import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

function Checkout(props) {
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const contactInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({name: true, address: true, contact: true, city: true, postal: true});

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredContact = contactInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isNameValid = !isEmpty(enteredName);
    const isAddressValid = !isEmpty(enteredAddress);
    const isCityValid = !isEmpty(enteredCity);
    const isContactValid = enteredContact.trim().length === 10;
    const isPostalValid = enteredPostal.trim().length <= 6;

    setFormInputsValidity({
      name: isNameValid,
      address: isAddressValid,
      contact: isContactValid,
      city: isCityValid,
      postal: isPostalValid
    })

    const isFormValid = (isNameValid && isAddressValid && isContactValid && isCityValid && isPostalValid);
    if(!isFormValid) return;
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      contact: enteredContact,
      city: enteredCity,
      postalCode: enteredPostal
    })
  };

  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div className={`${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.address ? '' : styles.invalid}`}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.address ? '' : styles.invalid}`}>
        <label htmlFor="contact">Contact Number</label>
        <input type="number" id="contact" ref={contactInputRef} />
        {!formInputsValidity.contact && <p>Please enter a valid 10 digit Contact Number!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.postal ? '' : styles.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Enter a valid Postal Code (less than 6 characters)!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
