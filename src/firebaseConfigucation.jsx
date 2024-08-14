import { initializeApp } from "firebase/app";

// Your Firebase config here
// const firebaseConfig = {
//         apiKey: "AIzaSyB7QJadGKxc_g4Rune700N1QjhhAaPnDHA",
//         authDomain: "inventarpch-57887.firebaseapp.com",
//         projectId: "inventarpch-57887",
//         storageBucket: "inventarpch-57887.appspot.com",
//         messagingSenderId: "758602823067",
//         appId: "1:758602823067:web:b613afe199fa688bdbdd3e",
//         measurementId: "G-BL4GQM9JRX"
//   };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDER_IDd,
  appId: process.env.REACT_APP_API_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

console.log(firebaseConfig)

// Initialize Firebase
//  const cong = initializeApp(firebaseConfig);


  export default firebaseConfig;
// Now you can use Firebase services in your React app!