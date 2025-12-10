import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';

const ModifyStockPerElement = ({ product, changeStock }) => {
    return (

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 6, md: 6 }}>
            <Grid xs={2} sm={1} md={1} > {product.name} </Grid>
            <Grid xs={3} sm={1} md={1} >
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => changeStock(product.id, 'newSealedQuantity', -1)}>-</Button>
                    <Button>{product.newSealedQuantity} </Button>
                    <Button onClick={() => changeStock(product.id, 'newSealedQuantity', 1)}>+</Button>
                </ButtonGroup>
            </Grid>
            <Grid xs={3} sm={1} md={1} >
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => changeStock(product.id, 'newUnsealedQuantity', -1)}>-</Button>
                    <Button>{product.newUnsealedQuantity} </Button>
                    <Button onClick={() => changeStock(product.id, 'newUnsealedQuantity', 1)}>+</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default ModifyStockPerElement;
