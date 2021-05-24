import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

function Backdrop(props) {
    return <div onClick={props.onClose} className={styles.backdrop}></div>
}

function ModalOverlay(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

function Modal(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById('overlays'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
        </Fragment>
    )
}

export default Modal;