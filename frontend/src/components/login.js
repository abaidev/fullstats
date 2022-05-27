import React, { useState } from 'react';
import { Box, Input, Button, Card, Grid } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import store from '../store/store';

const LoginForm = () => {
    const [showModal, setShowModal] = useState(false);
    const modalClose = (bool) => { setShowModal(bool) }
    let navigate = useNavigate();

    const onFormSubmit = async (event) => {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;

        let credentials = {username, password}
        let status = await store.authenticate(credentials);
        if (status) {
            store.getUserFavorites();
            navigate("/")
        } else {
            setShowModal(true);
        }
    };

    const styles = {
        input: {
            display: "block",
            width: "100%"
        },
        inputDiv: {
            marginBottom: 15,
        }
    }

    return (
        <>
            <Grid container spacing={2} style={{ maxWidth: 900, margin: "auto", paddingTop: 5 }}>
                <Card size={"small"} style={{ width: "70%", maxWidth: "100%", margin: "auto", marginVertical: 10 }}>
                    <Box sx={{ padding: 2 }} component="form" onSubmit={onFormSubmit} noValidate>
                        <div style={styles.inputDiv}><Input placeholder="Username" style={styles.input} type="username" name='username' /></div>
                        <div style={styles.inputDiv}><Input placeholder="Password" style={styles.input} type="password" name='password' /></div>
                        <Button size="small" variant='outlined' type="submit">Login</Button>
                        <Button size="small" variant='outlined' type="button" className='ms-3 d-inline-block bg-secondary'>
                            <Link to='/signup' className='text-light text-decoration-none bg-secondary'>
                                Signup
                            </Link>
                        </Button>
                    </Box>
                </Card>
            </Grid>

            <Modal showModal={showModal} modalClose={modalClose} />
        </>
    );
};


const Modal = ({ showModal, modalClose }) => {
    const onClose = () => { modalClose(false) };
    const display = showModal ? "block" : "none";
    const modalCss = {
        display: display,
        width: "50%",
        margin: "auto",
        maxHeight: "45%",
        top: "10%",
    }

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={modalCss}>
            <div className="modal-dialog" role="document" style={{ maxWidth: "100%", height: "100%", margin: 0 }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger"><strong>Ошибка данных</strong></h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <h6>Неверные данные либо вы еще не активировали аккаунт</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
