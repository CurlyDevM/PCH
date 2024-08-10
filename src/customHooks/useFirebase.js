import { useState } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfigucation from '../firebaseConfigucation';


const useFirebase = () => {

    const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
    console.log('isFirebaseInitialized', isFirebaseInitialized)
    const initializaFirebase = () => {
        if (!firebase.apps.length) {
            console.log('init')
            firebase.initializeApp(firebaseConfigucation);
            console.log('set true')
            setIsFirebaseInitialized(true)
        } else {
            firebase.app(); // if already initialized, use that one
        }
    };
    const firebaseObject = firebase;

    return { firebaseObject, isFirebaseInitialized, initializaFirebase };
};

export default useFirebase;