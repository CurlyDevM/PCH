import React, { useState, useContext } from 'react'

import Context from '../Context';

import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import style from './ModifyStockSelect.module.css'

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250,
      },
    },
  };

const ModifyStockSelect = ({ modifyMode, onSetNewStock, setModifyMode }) => {

    const { products } = useContext(Context);

    const [productsSelected, setProductsSelected] = useState([]);

    const onSelectCompleted = () => {
        setModifyMode(true);
        onSetNewStock(productsSelected.map(product => {
          return {
            ...product,
            newUnsealedQuantity: product.unsealed_quantity,
            newSealedQuantity: product.sealed_quantity
          }
        }));
      }

      const handleChange = (e) => {
        setProductsSelected(e.target.value)
      }

  return (
    <div className={`${style.container} selectMode`}>
      <h4> Selecteaza manual</h4>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Lista de Produse</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={productsSelected}
              onChange={handleChange}
              input={<OutlinedInput label="Lista de Produse" />}
              MenuProps={MenuProps}
            >
              {products?.map((product) => (
                <MenuItem
                  key={product.barcode}
                  value={product}
                  // disabled={productsScanned.length > 0}
                // style={getStyles(name, personName, theme)}
                >
                  {product.name} {product.weight}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="success" onClick={() => onSelectCompleted()} disabled={modifyMode || productsSelected.length === 0}>  Selecteaza </Button> {/* || productsScanned.length > 0 */}
    </div>
  )
}

export default ModifyStockSelect
