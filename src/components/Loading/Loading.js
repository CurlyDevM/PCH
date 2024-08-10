import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import useFirebase from '../../customHooks/useFirebase';

const Loading = () => {

    const navigate = useNavigate();
    // const { initializaFirebase, isFirebaseInitialized } = useFirebase();

    // useEffect(() => {
    //     initializaFirebase();
    // }, [])

    // useEffect( () => {
    //     if(isFirebaseInitialized) {
    //         navigate('/auth');
    //     }
    // }, [isFirebaseInitialized])

    return (
        <div>Loading</div>
    )
}
export default Loading;