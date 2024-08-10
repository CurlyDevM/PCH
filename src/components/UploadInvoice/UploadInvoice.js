import React, { useState, useEffect, useContext } from 'react'
import Tesseract from 'tesseract.js';
import { styled } from '@mui/material/styles';

import style from './UploadInvoice.module.css';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Context from '../Context';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const UploadInvoice = ({ setProductsNewStock, setModifyMode }) => {

    const { products } = useContext(Context);

    const [selectedImage, setSelectedImage] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');


    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        setSelectedImage(URL.createObjectURL(image));
    };

    useEffect(() => {
        const recognizeText = async () => {
            if (selectedImage) {
                const result = await Tesseract.recognize(selectedImage);
                setRecognizedText(result.data.text);
            }
        };
        recognizeText();
    }, [selectedImage]);

    useEffect(() => {
        if (recognizedText?.length > 0) {
            const wordsReconized = recognizedText.replace(/\n/g, ' ').split(' ');
            if (wordsReconized?.length > 0) {
                const barcodes = wordsReconized.filter(char => char.match(/\d{8}/));
                const scannedProducts = [];
                for (let barcode of barcodes) {
                    const barcodeIndex = wordsReconized.findIndex(word => word === barcode)
                    // console.log(barcodeIndex);
                    console.log(barcode, barcodeIndex, wordsReconized[barcodeIndex - 1], wordsReconized[barcodeIndex])
                    const productDetails = products.find(pr => pr.barcode === barcode);
                    const quantity = wordsReconized[barcodeIndex - 1]
                    if (productDetails) {
                        scannedProducts.push({
                            ...productDetails,
                            newUnsealedQuantity: productDetails.unsealed_quantity,
                            newSealedQuantity: isNaN(quantity) ? productDetails.sealed_quantity : productDetails.sealed_quantity + Number(quantity),
                            checkAlert: isNaN(quantity)
                        });
                    }
                }

                if(scannedProducts.length > 0) {
                    setProductsNewStock(scannedProducts)
                    setModifyMode(true)
                }
            }
        }

    }, [recognizedText])

    return (
        <div className={style.container}>
             <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload file
                <VisuallyHiddenInput type="file" />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </Button>
        </div>
    );

}

export default UploadInvoice;
