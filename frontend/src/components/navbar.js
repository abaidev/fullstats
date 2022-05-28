import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import store from '../store/store';

const Navbar = observer(() => {
    return (
        <nav id="ftco-navbar" className="navbar navbar-expand-lg navbar-dark ftco_navbar bd-navbar sticky-top ftco-navbar-light scrolled awake mb-3">
            <div className="container">
                <NavLink to="/"
                    className={({ isActive }) => "navbar-brand nav-link" + (!isActive ? " " : " active")} >
                    FullStats
                </NavLink>

                <div className="collapse navbar-collapse float-start" id="ftco-nav">
                    {
                        store.user.token ? 
                            <>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink to="/user/favorites"
                                            className={({ isActive }) => "nav-link" + (!isActive ? " " : " active")} >
                                            Favorites
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/articles/create"
                                            className={({ isActive }) => "nav-link" + (!isActive ? " " : " active")} >
                                            Create
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" onClick={() => store.logout()}
                                            className={({ isActive }) => "nav-link" + (!isActive ? " " : " active")} >
                                            Sign out
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className='ms-auto'>
                                    <IconButton aria-label="avatar" style={{ border: '1px solid white' }}>
                                        <PersonRoundedIcon />
                                    </IconButton>
                                </div>
                            </>
                            :
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink to="/login"
                                        className={({ isActive }) => "nav-link" + (!isActive ? " " : " active")} >
                                        Sign in
                                    </NavLink>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </nav>
    );
});


export default Navbar;
