import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';

import Context from '../Context';

import style from './Product.module.css';



const Product = ({ precompletedBarcode, existentProduct, onClosePortal }) => {

    const { products, addElement, editProduct } = useContext(Context);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [weightType, setWeightType] = useState("ml")
    const [barcode, setBarcode] = useState("");
    const [category, setCategory] = useState("");
    const [sealedQuantity, setSealedQuantity] = useState(0);
    const [unsealedQuantity, setUnsealedQuantity] = useState(0);
    const [warningQuantity, setWarningdQuantity] = useState(0);
    const [errorProductAlreadyExist, setErrorProductAlreadyExist] = useState(false)


    const categories = ["Ulei esential", "Single Oils", "Proprietary Blends", "Roll-On Essentials", " dōTERRA Air™", "Deep Blue™", "ZenGest™", " MetaPWR™", " Daily Vitality", " Specialised Supplements", "dōTERRA On Guard™", "Essential Skin Care", "dōTERRA sun Care", "dōTERRA Spa", " HD Clear™ Skin Care", " dōTERRA Hair Care", "Veráge™ Skin Care", "dōTERRA Women", "Enrolment Kits", "Accessories", "Supliment"]
    const weightTypes = ["ml", "g"];

    useEffect(() => {
        if (precompletedBarcode && barcode === "") {
            setBarcode(precompletedBarcode);
        }
        if (existentProduct && name === "") {
            setName(existentProduct.name);
            setBarcode(existentProduct.barcode);
            setWeight(existentProduct.weight);
            setCategory(existentProduct.category);
            setSealedQuantity(existentProduct.sealed_quantity);
            setUnsealedQuantity(existentProduct.unsealed_quantity);
            setWarningdQuantity(existentProduct.warning_quantity);
        }

    }, [precompletedBarcode, existentProduct, weightTypes]);

    useEffect(() => {
        if(!existentProduct) {
            let isDuplicate = false;
            for( let product of products) {
                if(product.barcode === barcode) {
                    setErrorProductAlreadyExist(true);
                    return;
                } else if( product.name === name && product.weight === weight && product.weightType === product.weightType) {
                    setErrorProductAlreadyExist(true);
                    return;
                }
            }
            if(isDuplicate !== errorProductAlreadyExist) {
                setErrorProductAlreadyExist(isDuplicate);
            }
        }
    }, [barcode, name, weight, weightType, products])

    const onSaveProduct = () => {
        const newProduct = {
            name,
            weight,
            weightType,
            barcode,
            category,
            sealed_quantity: Number(sealedQuantity),
            unsealed_quantity: Number(unsealedQuantity),
            warning_quantity: Number(warningQuantity),
        }
        if (existentProduct) {
            editProduct({ ...newProduct, id: existentProduct.id });
        } else {
            addElement('products', newProduct);
            if(!precompletedBarcode) {
                navigate('/home');
            }
        }
        if (onClosePortal) {
            onClosePortal(null);
        }

    }

    return (
        <Box className={`Product ${style.container}`} display='flex' justifyContent='center' flexDirection='column' margin='0 25vw'>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
                <InputLabel htmlFor="standard-adornment-amount">Nume</InputLabel>
                <Input id="standard-adornment-amount" value={name} onChange={(e) => setName(e.target.value)} error={errorProductAlreadyExist}/>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
                <InputLabel htmlFor="standard-adornment-amount">Gramaj</InputLabel>
                <Input id="standard-adornment-amount" value={weight} type="number" onChange={(e) => setWeight(e.target.value)} error={errorProductAlreadyExist}/>
            </FormControl>
            <Autocomplete
                options={categories}
                id="category"
                clearOnEscape
                value={category}
                onChange={(event, newValue) => {
                    setCategory(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Categorie" variant="standard" />
                )}
                error={errorProductAlreadyExist}
            />
             <Autocomplete
                options={weightTypes}
                id="weightType"
                clearOnEscape
                value={weightType}
                onChange={(event, newValue) => {
                    setWeightType(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Unitate de masura" variant="standard" />
                )}
                error={errorProductAlreadyExist}
            />
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Barcode</InputLabel>
                <Input id="standard-adornment-amount" value={barcode} onChange={(e) => setBarcode(e.target.value)} error={errorProductAlreadyExist} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
                <InputLabel htmlFor="standard-adornment-amount">Cantitate sigilata</InputLabel>
                <Input id="standard-adornment-amount" type="number" value={sealedQuantity} onChange={(e) => setSealedQuantity(e.target.value)} disabled={existentProduct}/>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Cantitate desigilata</InputLabel>
                <Input id="standard-adornment-amount" type="number" value={unsealedQuantity} onChange={(e) => setUnsealedQuantity(e.target.value)} disabled={existentProduct}/>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Alerta stoc sigilate</InputLabel>
                <Input id="standard-adornment-amount" type="number" value={warningQuantity} onChange={(e) => setWarningdQuantity(e.target.value)} />
            </FormControl>
            <FormHelperText id="product-helper-text">
                {errorProductAlreadyExist ? <div className={style.error}> Produsul exista deja! </div> : ""}
            </FormHelperText>
            <Button variant="contained" color="success" onClick={() => onSaveProduct()} disabled={errorProductAlreadyExist}>Adauga</Button>
        </Box>
    )
}

export default Product;