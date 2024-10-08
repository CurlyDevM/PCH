import React, { useEffect, useState } from 'react'

import style from './AllProducts.module.css';

import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


import Table from '../Table/Table';

import { productsTableHeader } from '../../config';


const categoriesToDisplay = ["Nume", "Cod de bare", "Categorie"];
const categories = {
    'Nume': 'name',
    'Cod de bare': 'barcode',
    'Categorie': 'category'
}

const AllProducts = ({ products }) => {

    const [category, setCategory] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [filtredProducts, setFiltredProducts] = useState(products);

    useEffect(() => {
        if (searchValue === "" || !searchValue) {
            setFiltredProducts(products);
        } else {
            console.log(products);
            setFiltredProducts(products.filter(product => {
                return product.barcode.toString().includes(searchValue) || product.name.toString().toLowerCase().includes(searchValue.toLowerCase())
            }));
        }
    }, [searchValue, products]);


    return (
        <div className={style.container}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Toate produsele</h3>
                <TextField className={style.search} id="outlined-basic" label="Cauta" variant="outlined" onChange={(e) => setSearchValue(e.target.value)} />
            </Box>
            <Table products={filtredProducts} header={productsTableHeader} />
        </div>
    )
}

export default AllProducts;
