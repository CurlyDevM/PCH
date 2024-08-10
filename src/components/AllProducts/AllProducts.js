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
            setFiltredProducts(products.filter(product => product[category].toString().toLowerCase().includes(searchValue.toLowerCase())))
        }
    }, [searchValue, products]);


    return (
        <div className={style.container}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Toate produsele</h3>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
                    <Autocomplete
                        className={style.category}
                        options={categoriesToDisplay}
                        id="category"
                        clearOnEscape
                        onChange={(event, newValue) => {
                            setCategory(categories[newValue]);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Dupa:" variant="standard" />
                        )}
                        sx={{ flexGrow: 1, maxWidth: '15vw', marginRight: '2vw'}}
                    />
                    <TextField className={style.search} id="outlined-basic" label="Cauta" variant="outlined" onChange={(e) => setSearchValue(e.target.value)} />
                </Box>
            </Box>
            <Table products={filtredProducts} header={productsTableHeader} />
        </div>
    )
}

export default AllProducts;
