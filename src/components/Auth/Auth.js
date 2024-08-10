//Packages
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import style from './Auth.module.css';

//Material-ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';


//Components
import { Password } from '../Password/Password';

const Auth = ({ user, signIn, signUp }) => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("")
    const [logInMode, setLogInMode] = useState(true);
    const [actionText, setActionText] = useState("");
    const [toggleActionText, setToggleActionText] = useState("");

    useEffect(() => {
        setActionText(logInMode ? 'Autentifica-te' : 'Creaza cont')
        setToggleActionText(logInMode ? 'Nu ai cont? Creaza!' : 'Ai deja cont? Autentifica-te!')

    }, [logInMode]);

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user])

    const handleToggleAction = () => {
        setLogInMode(!logInMode)
    }

    const onPasswordChange = (newPass) => {
        setPass(newPass)
    }

    const onConfirmPasswordChange = (newConfirmPass) => {
        setConfirmPass(newConfirmPass)
    }

    const handleAuth = () => {
        if (logInMode) {
            signIn(email, pass)
        } else {
            if (pass === confirmPass) {
                signUp(email, pass, name)
            } else {
                // show error
            }
        }
    }


    return (
        <div>
            <Box className={style.container} component="form" noValidate autoComplete="off">
                <div className={style.floatingContainer}>
                    <div className={style.logoCon}> <img src="img/logo.png" alt="" /> </div>
                    <div className={style.logInModal}>
                        <h1> Autentifica-te! </h1>
                        {!logInMode && <TextField id="outlined-basic" label="Nume" variant="outlined" onChange={e => setName(e.target.value)} required />}
                        <div className={style.inputCon}>
                            <EmailOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" variant="outlined" onChange={e => setEmail(e.target.value)} required/>
                        </div>
                        <div className={style.inputCon}>
                            <LockOpenRoundedIcon /> 
                            <Password onPasswordChange={onPasswordChange} /> 
                        </div>
                        {!logInMode && <Password onPasswordChange={onConfirmPasswordChange} />}
                        <Button onClick={() => handleAuth()} variant="outlined">{actionText}</Button>
                        <Button onClick={() => handleToggleAction()} variant="text">{toggleActionText}</Button>
                    </div>
                </div>

            </Box>
        </div>
    )

}

export default Auth;
