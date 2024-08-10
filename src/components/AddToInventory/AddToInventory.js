import React, { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Context from '../Context';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ModifyStockPerElement from '../ModifyStockPerElement/ModifyStockPerElement';
import UploadInvoice from '../UploadInvoice/UploadInvoice';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250,
    },
  },
};


const AddToInventory = ({ user, editProduct, addElement }) => {

  const { products } = useContext(Context);

  const [productsScanned, setProductsScanned] = useState([]);
  const [barcodesError, setBarcodesError] = useState([])
  const [productsSelected, setProductsSelected] = useState([]);
  const [productsNewStock, setProductsNewStock] = useState([]);
  const [modifyMode, setModifyMode] = useState(false);
  const [scanMode, setScanMode] = useState(null)


  const onSelectCompleted = () => {
    setModifyMode(true);
    setProductsNewStock(productsSelected.map(product => {
      return {
        ...product,
        newUnsealedQuantity: product.unsealed_quantity,
        newSealedQuantity: product.sealed_quantity
      }
    }));
  }

  const onScanCompleted = () => {
    setModifyMode(true);
    setProductsNewStock(productsScanned);
  }

  const handleChange = (e) => {
    setProductsSelected(e.target.value)
  }

  const changeStock = (productId, valueChanged, changeAmount) => {
    const newStock =structuredClone(productsNewStock);
    const productModified = newStock.find( p => p.id === productId);
    productModified[valueChanged] = productModified[valueChanged] + changeAmount;
    setProductsNewStock(newStock);
  }

  const onScanned = (e) => {
    const scannedBarcodes = e.target.value.split(' ');
    const newScannedProducts = [];
    const newBarcodesError = [];
    for (let barcode of scannedBarcodes) {
      const isProductAlreadyScanned = newScannedProducts.find(p => p.barcode === barcode)
      if (isProductAlreadyScanned) {
        isProductAlreadyScanned.newSealedQuantity = isProductAlreadyScanned.newSealedQuantity + Number(scanMode)
      } else {

        const prd = products?.find(p => p.barcode === barcode);
        if (prd) {
          newScannedProducts.push({
            ...prd,
            newUnsealedQuantity: prd.unsealed_quantity,
            newSealedQuantity: prd.sealed_quantity + Number(scanMode),
          })
        } else {
          newBarcodesError.push(barcode);
        }
      }
    }
    if (newBarcodesError.length > 0) {
      setBarcodesError(newBarcodesError);
    }
    if (newScannedProducts.length > 0) {
      setProductsScanned(newScannedProducts);
    }
  }

  const confirmModifications = () => {
    for( let newProduct of  productsNewStock) {
      editProduct(newProduct);
    }
    addElement('logs', {
      user_id: user.uid,
      user_name: user.displayName,
      time_stamp: Date(),
      products: productsNewStock.map( p => {
        return {
          name: p.name,
          old_sealed_quantity: p.sealed_quantity,
          old_unsealed_quantity: p.unsealed_quantity,
          new_sealed_quantity: p.newSealedQuantity || p.sealed_quantity,
          new_unsealed_quantity: p.newUnsealedQuantity || p.unsealed_quantity,
        }
      })
    });
  }

  console.log(productsNewStock);

  return (
    <div className="AddToInventory">
      <h2> Modifica inventar </h2>
      <div className="AddToInventory__selectMode">
        <Box>
          <h4> Scaneaza</h4>
          <TextField id="outlined-basic" label="Scaneaza produse" variant="outlined" onChange={e => onScanned(e)} disabled={!scanMode || productsSelected.length > 0} />
          {scanMode
            ? <Button variant="contained" color="success" onClick={() => onScanCompleted()} disabled={modifyMode || productsSelected.length > 0}>  Aplica </Button>
            : (<>
              <Button variant="contained" color="success" onClick={() => setScanMode(1)}> Adauga </Button>
              <Button variant="contained" color="error" onClick={() => setScanMode(-1)}> Scoate </Button>
            </>)}
        </Box>

        <h3> Sau </h3>

        <div>
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
                  disabled={productsScanned.length > 0}
                // style={getStyles(name, personName, theme)}
                >
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="success" onClick={() => onSelectCompleted()} disabled={modifyMode || productsScanned.length > 0}>  Selecteaza </Button>
        </div>
        <h3> Sau </h3>
        <UploadInvoice setProductsNewStock={setProductsNewStock} setModifyMode={setModifyMode} />
      </div>
      {productsNewStock && (

        <div className="AddToInventory__modifyMode">
          <h2> Modifica stocul produselor</h2>
          {modifyMode && (
            productsNewStock.map(product => <ModifyStockPerElement product={product} changeStock={changeStock} />)
          )}
          <h2> Modificari aduse stocului </h2>
          <div className="AddToInventory__modifyHistory">
            {
              productsNewStock.map(product => {
                const unsealedDiff = product.newUnsealedQuantity - product.unsealed_quantity;
                const sealedDiff = product.newSealedQuantity - product.sealed_quantity;
                const diffToShow = sealedDiff || unsealedDiff
                  ? (<>
                    <div> {` Sigilate: ${sealedDiff}`}</div>
                    <div> {`Desfacute: ${unsealedDiff} `}</div>
                  </>)
                  : '-';
                return <> <div> {product.name} </div> {diffToShow} </>
              })
            }
          </div>
          <Button className="AddToInventory__modifyHistory__confirm" variant="outlined" color="success" onClick={() => confirmModifications()}> Confirma modificari </Button>
        </div>
      )}
    </div>
  )
}

export default AddToInventory;
