import React, { useState, useEffect, useContext } from 'react'
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

import style from './UserPage.module.css';

import Context from '../Context';

const UserPage = () => {

  const auth = getAuth();
  const { user } = useContext(Context);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")


  useEffect(() => {
    setEmail(user?.email);
    setName(user?.displayName);
  }, [user])


  const onUpdateUserProfile = () => {
    if (name) {
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(response => {
        console.log(response)
      })
    }
    if (email) {
      console.log(auth.currentUser, email);
      updateEmail(auth.currentUser, email).then((resp) => {
        console.log(resp)
      })
    }
    if (password && confirmPassword && password === confirmPassword) {
      updatePassword(auth.currentUser, password).then((response) => {
        console.log(response);
      })
    }
  }

  console.log(confirmPassword)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(e.target.value));
  }

  const handleConfirmPasswordChange = newConfirmPass => {
    setConfirmPassword(newConfirmPass)
    setConfirmPasswordError(newConfirmPass !== password)
  }

  return (
    <div className={style.container}>
      <h1> Datele tale</h1>
      <div className={style.form}>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
          <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
          <Input id="standard-adornment-amount" type="email" variant="outlined" value={email} onChange={(e) => handleEmailChange(e)} error={emailError} />
          <FormHelperText id="email-helper-text">
            {emailError ? "Adresa de email nu este validă!" : ""}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Parola</InputLabel>
          <OutlinedInput
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirma parola</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            error={confirmPasswordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText id="email-helper-text">
            {confirmPasswordError ? "Parolele nu corespund!" : ""}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
          <InputLabel htmlFor="standard-adornment-amount">Nume</InputLabel>
          <Input id="standard-adornment-amount" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <Button variant="contained" color="success" onClick={() => onUpdateUserProfile()} disabled={emailError || confirmPasswordError}> Salveaza modificarile </Button>
      </div>
    </div>
  )
}

export default UserPage;
