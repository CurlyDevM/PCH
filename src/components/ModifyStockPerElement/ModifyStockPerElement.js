import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Unstable_Grid2';

const ModifyStockPerElement = ({ product, changeStock }) => {
    console.log('e')
    return (
        <div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid xs={2} sm={4} md={4} > {product.name} </Grid>
                <Grid xs={2} sm={4} md={4} > Cantitate sigilata </Grid>
                <Grid xs={2} sm={4} md={4} > Cantitate desfacuta </Grid>
                <Grid xs={2} sm={4} md={4} >  </Grid>
                <Grid xs={2} sm={4} md={4} >
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button onClick={() => changeStock(product.id, 'newSealedQuantity', -1)}>-</Button>
                        <Button>{product.newSealedQuantity} </Button>
                        <Button onClick={() => changeStock(product.id, 'newSealedQuantity', 1)}>+</Button>
                    </ButtonGroup>
                </Grid>
                <Grid xs={2} sm={4} md={4} >
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => changeStock(product.id, 'newUnsealedQuantity', -1)}>-</Button>
                        <Button>{product.newUnsealedQuantity} </Button>
                        <Button onClick={() => changeStock(product.id, 'newUnsealedQuantity', 1)}>+</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    )
}

export default ModifyStockPerElement;
