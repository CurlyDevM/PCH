import * as React from 'react';
import {  useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import style from './FloatingMenu.module.css'

const actions = [
  { icon: <CreateRoundedIcon />, name: 'Modifica jurnal', url: '/add'},
  { icon: <FormatListBulletedRoundedIcon />, name: 'Jurnal', url: '/logs' },
  { icon: <MapsUgcRoundedIcon />, name: 'Adauga produs', url: '/add-product' },
  { icon: <HomeRoundedIcon />, name: 'Acasa', url: '/home' },
];

export default function BasicSpeedDial() {

  const navigate = useNavigate();

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }} className={style.container}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={ () => navigate(action.url)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}