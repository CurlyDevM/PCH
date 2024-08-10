import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import style from './Header.module.css';

import Context from '../Context';

const Header = ({ user }) => {

  const { isMobile } = useContext(Context);

  if (user) {
    return (
      <div className={style.container}>
        <NavLink to={'/home'}>
          <div className={style.appLogo}>
            <img src="img/logo.png" alt="" />
            <div> Inventar Picatura cu Har </div>
          </div>
        </NavLink>
        {!isMobile && (
          <div className={style.pages}>
            <NavLink to={'/add'} style={({ isActive }) => ({ color: isActive ? '#295d96' : '' })}>
              Modifica inventarul
            </NavLink>
            <NavLink to={'/logs'} style={({ isActive }) => ({ color: isActive ? '#295d96' : '' })}>
              Jurnal
            </NavLink>
            <NavLink to={'/add-product'} style={({ isActive }) => ({ color: isActive ? '#295d96' : '' })}>
              Adauga produs
            </NavLink>
          </div>
        )}
        <NavLink to={'/user'}>
          <IconButton sx={{ p: 0 }}>
            <Avatar src={`img/users/${user.displayName}.jpg`} alt={`Buna, ${user.displayName}`} sx={{ width: 60, height: 60 }} />
          </IconButton>
        </NavLink>
      </div>
    )
  } else return null;
}

export default Header;
