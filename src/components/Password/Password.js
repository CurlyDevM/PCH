import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export const Password = ({ onPasswordChange }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");


    // useEffect( () => {
    //     onPasswordChange(password);
    // }, [password])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={e => handleMouseDownPassword(e)}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                onChange={e => onPasswordChange(e.target.value)}
            />
        </FormControl>
    )
}
