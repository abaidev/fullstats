import React, { useState } from 'react';
import { Box, Input, Button, Card } from '@mui/material';
import { csrftoken } from '../store/csrf_token';

const API = process.env.REACT_APP_API;

const SignupForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const modalClose = (bool) => { setShowModal(bool); setModalMsg('') }
    const onFormSubmit = async (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = {
            "username": form.username.value,
            "email": form.email.value,
            "password1": form.password1.value,
            "password2": form.password2.value,
        };
        let res = await fetch(`${API}/account/signup/`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json; charset=utf8",
                'Accept': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
        if (res.ok) {
            form.reset();
            setModalMsg("Your account is been processed. Please check your email for confirmation.");
            setShowModal(true);
        } else {
            setModalMsg("Sorry, you got filling errors or User with such data already exists.");
            setShowModal(true);
        }
    };

    return (
        <>
            <Card size={"small"} style={{ maxWidth: "450px", margin: "auto", marginBottom: "15px" }}>
                <Box sx={{ padding: 2 }} component="form" onSubmit={onFormSubmit} noValidate>
                    <div style={styles.inputDiv}>
                        <Input placeholder="Username" style={styles.input} type="username" name='username' />
                    </div>
                    <div style={styles.inputDiv}>
                        <Input placeholder="Email" style={styles.input} type="email" name='email' />
                    </div>
                    <div style={styles.inputDiv}>
                        <Input placeholder="Password" style={styles.input} type="password" name='password1' />
                    </div>
                    <div style={styles.inputDiv}>
                        <Input placeholder="Password Confirm" style={styles.input} type="password" name='password2' />
                    </div>
                    <Button size="small" variant='outlined' type="submit">Signup</Button>
                </Box>
            </Card>

            <Modal showModal={showModal} modalClose={modalClose} message={modalMsg} />
        </>
    );
};


const Modal = ({ showModal, modalClose, message }) => {
    const onClose = () => { modalClose(false) };
    const display = showModal ? "block" : "none";
    const modalCss = {
        display: display,
        width: "50%",
        margin: "0 25%",
        maxHeight: "45%",
        top: "20%",
    }

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={modalCss}>
            <div className="modal-dialog" role="document" style={{ maxWidth: "100%", height: "100%", margin: 0 }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-info"><strong>Registration</strong></h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <h6>{message}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    input: {
        display: "block",
        width: "100%"
    },
    inputDiv: {
        marginBottom: 15,
    }
}

export default SignupForm;
