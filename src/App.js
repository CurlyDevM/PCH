import React, { useEffect, useState } from 'react';
import { useRoutes } from "react-router-dom";


//Hooks
import useAuth from './customHooks/useAuth';
import useFirebase from './customHooks/useFirebase';

import Auth from './components/Auth/Auth';
import Context from './components/Context';
import Home from './components/Home/Home'
import AddToInventory from "./components/AddToInventory/AddToInventory";
import AddProduct from "./components/AddProduct/AddProduct";
import Logs from "./components/Logs/Logs";
import EditProduct from "./components/EditProduct/EditProduct";
import Header from './components/Header/Header';
import UserPage from './components/UserPage/UserPage';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';

function App() {

  const { firebaseObject, isFirebaseInitialized, initializaFirebase } = useFirebase();
  const { user, products, logs, signIn, signUp, getProducts, getLogs, addElement, editProduct } = useAuth(firebaseObject, isFirebaseInitialized);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000)

  useEffect(() => {
      initializaFirebase();
      window.addEventListener('resize', () => {
          setIsMobile(window.innerWidth <= 1000);
      })
  }, [])

  useEffect(() => {
    if(!products && user) {
      getProducts('products')
    }
  }, [user])
  useEffect(() => {
    if(!logs && user) {
      getLogs('logs')
    }
  }, [user])

  console.log(user);

  let element = useRoutes([
    { path: "/", element: <Auth user={user} signIn={signIn} signUp={signUp}/> },
    { path: "/home", element: <Home /> },
    { path: "/add", element: <AddToInventory user={user} editProduct={editProduct} addElement={addElement} /> },
    { path: "/logs", element: <Logs logs={logs} /> },
    { path: "/add-product", element: <AddProduct addElement={addElement} /> },
    { path: "/edit-product", element: <EditProduct /> },
    { path: "/user", element: <UserPage /> },
  ]);

  return (
    <Context.Provider value={{ products, isMobile }}> 
      <Header user={user} />
      {element}  
      {(user && isMobile) && <FloatingMenu />}   
    </Context.Provider >
  );
}

export default App;
