import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import store from '../store/store';

const Navbar = observer(() => {
    return (
        <nav id="ftco-navbar" className="navbar navbar-expand-lg navbar-dark ftco_navbar bd-navbar sticky-top ftco-navbar-light scrolled awake mb-3">
            <div className="container">
                <NavLink to="/"
                    className={({isActive}) => "navbar-brand nav-link" + (!isActive ? " " : " active")} >
                    FullStats
                </NavLink>

                <div className="collapse navbar-collapse float-end" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        {
                            store.user.token
                                ? <>
                                    <li className="nav-item">
                                        <NavLink to="/user/favorites"
                                            className={({isActive}) => "nav-link" + (!isActive ? " " : " active")} >
                                            Избранное
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/articles/create"
                                            className={({isActive}) => "nav-link" + (!isActive ? " " : " active")} >
                                            Создать
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" onClick={()=>store.logout()}
                                            className={({isActive}) => "nav-link" + (!isActive ? " " : " active")} >
                                            Выйти
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <li className="nav-item">
                                    <NavLink to="/login"
                                        className={({isActive}) => "nav-link" + (!isActive ? " " : " active")} >
                                        Войти
                                    </NavLink>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
});


export default Navbar;
