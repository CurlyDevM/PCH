import React, { useContext, useState } from 'react';

import style from './AddToInventory.module.css';

import Context from '../Context';
import Drawer from '@mui/material/Drawer';
import UploadInvoice from '../UploadInvoice/UploadInvoice';
import ModifyStockScan from '../ModifyStockScan/ModifyStockScan';
import ModifyStockSelect from '../ModifyStockSelect/ModifyStockSelect';
import ReviewStockModifications from '../ReviewStockModifications/ReviewStockModifications';


const AddToInventory = ({ user, editProduct, addElement }) => {

  const { products } = useContext(Context);
  const [productsNewStock, setProductsNewStock] = useState([]);
  const [modifyMode, setModifyMode] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const changeStock = (productId, valueChanged, changeAmount) => {
    const newStock = structuredClone(productsNewStock);
    const productModified = newStock.find(p => p.id === productId);
    productModified[valueChanged] = productModified[valueChanged] + changeAmount;
    productModified.unsealedDiff = productModified.newUnsealedQuantity - productModified.unsealed_quantity;
    productModified.sealedDiff = productModified.newSealedQuantity - productModified.sealed_quantity;
    setProductsNewStock(newStock);
  }

  const confirmModifications = () => {
    for (let newProduct of productsNewStock) {
      editProduct(newProduct);
    }
    addElement('logs', {
      user_id: user.uid,
      user_name: user.displayName,
      time_stamp: Date(),
      products: productsNewStock.map(p => {
        return {
          name: p.name,
          weight: p.weight,
          old_sealed_quantity: p.sealed_quantity,
          old_unsealed_quantity: p.unsealed_quantity,
          new_sealed_quantity: p.newSealedQuantity || p.sealed_quantity,
          new_unsealed_quantity: p.newUnsealedQuantity || p.unsealed_quantity,
        }
      })
    });
  }

  const onSetNewStock = (productsSelected) => {
    setProductsNewStock(productsSelected);
    setReviewMode(true);
  }

  const closeReviewModal = () => {
    setReviewMode(false);
    setModifyMode(null);
    setProductsNewStock([]);
  }

  return (
    <div className={style.container}>
      <h2> Modifica inventar </h2>
      <div className={style.possibilities}>
        <ModifyStockScan onSetNewStock={onSetNewStock} setModifyMode={setModifyMode} modifyMode={modifyMode} />
        <h3> Sau </h3>
        <ModifyStockSelect onSetNewStock={onSetNewStock} setModifyMode={setModifyMode} modifyMode={modifyMode} />
        <h3> Sau </h3>
        <UploadInvoice onSetNewStock={onSetNewStock} setModifyMode={setModifyMode} products={products} />
      </div>
      <Drawer open={reviewMode} anchor="bottom" onClose={() => closeReviewModal()}>
        <ReviewStockModifications productsNewStock={productsNewStock} confirmModifications={confirmModifications} changeStock={changeStock} />
      </Drawer>
    </div>
  )
}

export default AddToInventory;
