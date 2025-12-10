// ./hooks/useAuth.js
import { useEffect, useState } from "react";
import dayjs from 'dayjs'

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
                    return { ...doc.data(), id: doc.id, weightToDisplay: `${doc.data().weight} ${doc.data().weightType ? doc.data().weightType : ''}`};
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
                                diff_unsealed_quantity: product.new_unsealed_quantity - product.old_unsealed_quantity,
                                diff_sealed_quantity: product.new_sealed_quantity - product.old_sealed_quantity,
                            }
                        })
                    }
                })
                const sortedLogs = dataWithCalcule.sort((a, b) =>  dayjs(b.time_stamp).unix() - dayjs(a.time_stamp).unix());
                setLogs(sortedLogs);
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
            const newProduct = {
                ...product,
                sealed_quantity: product.newSealedQuantity ? Number(product.newSealedQuantity) : product.sealed_quantity , 
                unsealed_quantity: product.newUnsealedQuantity ? Number(product.newUnsealedQuantity) : product.unsealed_quantity
            }
            console.log('to update', newProduct)
            db.collection('products').doc(product.id).update(newProduct) 
        }
    }

    return { user, products, logs, isLoading, getProducts, getLogs, addElement, signIn, signUp, editProduct };
};

export default useAuth;