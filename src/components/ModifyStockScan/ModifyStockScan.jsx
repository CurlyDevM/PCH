import { useState, useEffect, useRef, useContext } from 'react'

import clsx from 'clsx';
import Portal from '@mui/material/Portal';
import Button from '@mui/material/Button';
import Context from '../Context';

import style from './ModifyStockScan.module.css';
import Product from '../Product/Product';
import useAreArraysEqual from '../../customHooks/useAreArraysEqual';

const ModifyStockScan = ({ modifyMode, onSetNewStock, setModifyMode }) => {


    const textAreaRef = useRef(null);
    const bufferRef = useRef("");
    const { products } = useContext(Context);

    const [scanMode, setScanMode] = useState(1)
    const [productsScanned, setProductsScanned] = useState([]);
    const [barcodesScanned, setBarcodesScanned] = useState('');
    const [barcodesError, setBarcodesError] = useState([]);
    const [barcodeAddProduct, setBarcodeAddProduct] = useState(null);


    useEffect(() => {
        const newScannedProducts = [];
        const newBarcodesError = [];
        const barecodesArray = barcodesScanned.split('\n');
        if(barcodesScanned?.length > 0) {
            for (let barcode of barecodesArray) {
                if(barcode.length > 1) {
                    const isProductAlreadyScanned = newScannedProducts.find(p => p.barcode === barcode);
                    if (isProductAlreadyScanned) {
                        isProductAlreadyScanned.newSealedQuantity = isProductAlreadyScanned.newSealedQuantity + Number(scanMode)
                    } else {
                        const prd = products?.find(p => p.barcode === barcode);
                        if (prd) {
                            newScannedProducts.push({
                                ...prd,
                                newUnsealedQuantity: prd.unsealed_quantity,
                                newSealedQuantity: Number(scanMode),
                            })
                        } else {
                            
                            newBarcodesError.push(barcode);
                        }
                    }
                }
            }
            
            if (!useAreArraysEqual(newScannedProducts, productsScanned)) {
                setProductsScanned(newScannedProducts);
            }
            if (!useAreArraysEqual(newBarcodesError, barcodesError)) {
                setBarcodesError(newBarcodesError);
            }
        }
    }, [barcodesScanned, products])

    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

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
            if (e.key === 'Enter') {
                e.preventDefault();
                setBarcodesScanned(barcodesScanned +  bufferRef.current + '\n');
                bufferRef.current = "";
            } else {
                bufferRef.current += e.key;
            }
        }
    }

    const onOpenAddProductPortal = (barcode) => {
        setBarcodeAddProduct(barcode)
    }
    console.log('barcodesError', barcodesError)

    return (
        <div className={`${style.container} selectMode`}>
            <h4> Scaneaza</h4>
            <textarea
                ref={textAreaRef}
                autoFocus
                placeholder='Scaneaza produsele'
                className="w-2/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 resize-none"
                value={barcodesScanned}
                onKeyDown={onScanned}
            />
            <button
                className={clsx(
                    "text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 my-5",
                    scanMode === 1 ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                )}
                onClick={() => onSelectScanMode(1)} disabled={modifyMode}
            >
                Adauga
            </button>
            <button
                className={clsx(
                    "text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 my-5",
                    scanMode === 1 ? "bg-gray-500 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"
                )}
                onClick={() => onSelectScanMode(-1)} disabled={modifyMode}
            >
                Scoate
            </button>
            <div className={style.error}>
                {barcodesError.map(b => (<div> Produsul {b} nu exista. <Button onClick={() => onOpenAddProductPortal(b)}> Adauga-l! </Button> </div>))}
                {barcodeAddProduct && (
                    <Portal>
                        <div className="Portal">
                            <div className="Portal__con">
                                {/* <Button className="Portal__con__close" onClick={() => setBarcodeAddProduct(null)}> <CloseIcon /> </Button> */}
                                <Product precompletedBarcode={barcodeAddProduct} onClosePortal={setBarcodeAddProduct} />
                            </div>
                        </div>
                    </Portal>
                )}
            </div>
            {scanMode && barcodesScanned
                ? (
                    <div>
                        <div className='m-0 text-center text-2xl'> Produse scanate </div>
                        <div className='grid grid-cols-2 gap-2 items-center justify-items-center border border-gray-300 rounded-lg'>
                            <div className='font-semibold px-5'> Denumire </div>
                            <div className='font-semibold px-5'> Cantitate scanata </div>
                            {productsScanned.map(product => {
                                return (<>
                                    <div> {product.name} </div>
                                    <div> {product[scanMode === 1 ? 'newSealedQuantity' : 'newUnsealedQuantity']}</div>
                                </>)
                            })}
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 my-5"
                            onClick={() => onScanCompleted()}
                        >
                            Aplica modificarile
                        </button>
                    </div>
                )
                : null
            }
        </div>
    )
}

export default ModifyStockScan;
