import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Product = ({ addElement }) => {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [barcode, setBarcode] = useState("")
    const [category, setCategory] = useState("");
    const [sealedQuantity, setSealedQuantity] = useState(0);
    const [unsealedQuantity, setUnsealedQuantity] = useState(0);
    const [warningQuantity, setWarningdQuantity] = useState(0);
    const categories = ["Ulei esential", "Supliment"]

    const onSaveProduct = () => {
        addElement('products',
            {
            name,
            barcode,
            category,
            sealed_quantity: Number(sealedQuantity),
            unsealed_quantity: Number(unsealedQuantity),
            warning_quantity: Number(warningQuantity)
        }
        );

        navigate('/home');
    }
    return (
        <Box display='flex' justifyContent='center' flexDirection='column' margin='0 25vw'>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
                <InputLabel htmlFor="standard-adornment-amount">Nume</InputLabel>
                <Input id="standard-adornment-amount" onChange={(e) => setName(e.target.value)}/>
            </FormControl>
            <Autocomplete
                options={categories}
                id="category"
                clearOnEscape
                onChange={(event, newValue) => {
                    setCategory(newValue);
                  }}
                renderInput={(params) => (
                    <TextField {...params} label="Categorie" variant="standard" />
                )}
            />
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Barcode</InputLabel>
                <Input id="standard-adornment-amount" onChange={(e) => setBarcode(e.target.value)}/>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
                <InputLabel htmlFor="standard-adornment-amount">Cantitate sigilata</InputLabel>
                <Input id="standard-adornment-amount" type="number" onChange={(e) => setSealedQuantity(e.target.value)}/>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Cantitate desigilata</InputLabel>
                <Input id="standard-adornment-amount" type="number" onChange={(e) => setUnsealedQuantity(e.target.value)}/>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Alerta stoc sigilate</InputLabel>
                <Input id="standard-adornment-amount" type="number" onChange={(e) => setWarningdQuantity(e.target.value)}/>
            </FormControl>
            <Button variant="contained" color="success" onClick={() => onSaveProduct()}>Adauga</Button>
        </Box>
    )
}

export default Product;