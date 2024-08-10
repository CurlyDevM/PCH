// ./hooks/useAuth.js
import { useEffect, useState } from "react";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';



const useAuth = (firebase, isFirebaseInitialized) => {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [logs, setLogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let auth, db, getProducts, getLogs, addElement, signIn, signUp, editProduct;

    if (firebase && isFirebaseInitialized) {
        auth = firebase?.auth();
        db = firebase?.firestore();
        // update firestore settings
        // db?.settings({ timestampsInSnapshots: true })

        getProducts = () => {
            db.collection('products').onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id };
                })
                setProducts(data);
            })
        }

        getLogs = () => {
            db.collection('logs').onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    return doc.data();
                })

                console.log(data);

                const dataWithCalcule = data?.map( log => {
                    return {
                        ...log,
                        products: log.products.map( product => {
                            return {
                                ...product,
                                diff_unsealed_quantity: product.old_unsealed_quantity - product.new_unsealed_quantity,
                                diff_sealed_quantity: product.old_sealed_quantity - product.new_sealed_quantity,
                            }
                        })
                    }
                })
                console.log(dataWithCalcule);
                setLogs(dataWithCalcule);
            })
        }

        addElement = (collectionName, element) => {
            db.collection(collectionName).add(element)
                .then(snapshot => {
                    console.log(snapshot?.docs?.map( doc => ({ ...doc.data(), id: doc.id })))
                })
        }
        signUp = (email, password, displayName) => {
            auth?.createUserWithEmailAndPassword(email, password)
                .then(res => {
                    return res.user.updateProfile({  displayName })
                })
        };

        signIn = (email, password) => {
            auth?.signInWithEmailAndPassword(email, password)
                .then(cred => {
                    setUser(cred?.user?.multiFactor?.user)
                })
        }

        editProduct = (product) => {
            console.log('to update', { sealed_quantity: Number(product.newSealedQuantity), unsealed_quantity: Number(product.newUnsealedQuantity) })
            db.collection('products').doc(product.id).update({ sealed_quantity: Number(product.newSealedQuantity), unsealed_quantity: Number(product.newUnsealedQuantity) }) 
            // console.log( db.collection("products").doc(product.id));
            // console.log(product);
            // db.collection('products').doc(product.id).update({ sealed_quantity: product.sealed_quantity, unsealed_quantity: product.unsealed_quantity }).then ( r => {
            //     console.log(r);
            // });
        }
    }

    return { user, products, logs, isLoading, getProducts, getLogs, addElement, signIn, signUp, editProduct };
};

export default useAuth;