import { useState } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfigucation from '../firebaseConfigucation';


const useFirebase = () => {

    const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
    const initializaFirebase = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfigucation);
            setIsFirebaseInitialized(true)
        } else {
            firebase.app(); // if already initialized, use that one
        }
    };
    const firebaseObject = firebase;

    return { firebaseObject, isFirebaseInitialized, initializaFirebase };
};

export default useFirebase;