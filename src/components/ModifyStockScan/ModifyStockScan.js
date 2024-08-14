import React, { useState, useEffect, useRef, useContext } from 'react'

import  Portal  from '@mui/material/Portal';
import Button from '@mui/material/Button';
import Context from '../Context';
import CloseIcon from '@mui/icons-material/Close';

import style from './ModifyStockScan.module.css';
import Product from '../Product/Product';

const ModifyStockScan = ({ modifyMode, onSetNewStock, setModifyMode }) => {


    const textAreaRef = useRef(null);
    const { products } = useContext(Context);

    const [scanMode, setScanMode] = useState(null)
    const [productsScanned, setProductsScanned] = useState([]);
    const [barcodesScanned, setBarcodesScanned] = useState('');
    const [barcodesError, setBarcodesError] = useState([]);
    const [barcodeAddProduct, setBarcodeAddProduct] = useState(null);


    useEffect(() => {
        if(productsScanned && barcodesError) {
            const newScannedProducts = [...productsScanned]
            const newBarcodesError = [];
            for(let barcode of barcodesError) {
                const productExist = products.find( product => product.barcode === barcode);
                if(productExist) {
                    newScannedProducts.push(productExist);
                } else {
                    newBarcodesError.push(barcode)
                }
            }
            setProductsScanned(newScannedProducts);
            setBarcodesError(newBarcodesError);
        }
    }, [products, productsScanned,barcodesError])

    const onSelectScanMode = (mode) => {
        setScanMode(mode);
        textAreaRef?.current.focus();
    }

    const onScanCompleted = () => {
        setModifyMode(true);
        onSetNewStock(productsScanned);
    }

    const onScanned = (e) => {
        if (scanMode) {
            const scannedBarcodes = e.target.value.split('\n');
            const newScannedProducts = [];
            const newBarcodesError = [];
            setBarcodesScanned(e.target.value)
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
                    } else if (barcode.length >= 8) {
                        newBarcodesError.push(barcode);
                    }
                }
            }
            if (newScannedProducts.length > 0) {
                setProductsScanned(newScannedProducts)
            }
            if (newBarcodesError.length > 0) {
                setBarcodesError(newBarcodesError);
            }
        }
    }

    const onOpenAddProductPortal = (barcode) => {
        setBarcodeAddProduct(barcode)
    }

    return (
        <div className={`${style.container} selectMode`}>
            <h4> Scaneaza</h4>
            <textarea ref={textAreaRef} placeholder='Scaneaza produsele' value={barcodesScanned} onChange={e => onScanned(e)} />
            {scanMode
                ? <Button variant="contained" color="success" onClick={() => onScanCompleted()}>  Aplica </Button>
                : (<>
                    <Button variant="contained" color="success" onClick={() => onSelectScanMode(1)} disabled={modifyMode}> Adauga </Button>
                    <Button variant="contained" color="error" onClick={() => onSelectScanMode(-1)} disabled={modifyMode}> Scoate </Button>
                </>)}
            <div className={style.error}>
                {barcodesError.map(b => (<div> Produsul {b} nu exista. <Button onClick={() => onOpenAddProductPortal(b)}> Adauga-l! </Button> </div>))}
                {barcodeAddProduct && (
                    <Portal>
                        <div className="Portal">
                            <div className="Portal__con">
                                <Button className="Portal__con__close" onClick={() => setBarcodeAddProduct(null)}> <CloseIcon /> </Button>
                                <Product precompletedBarcode={barcodeAddProduct} onClosePortal={setBarcodeAddProduct} />
                            </div>
                        </div>
                    </Portal>
                )}
            </div>
        </div>
    )
}

export default ModifyStockScan;
