import React from 'react'
import Button from '@mui/material/Button';

import style from './ReviewStockModifications.module.css'
import { reviewModificationHeader } from '../../config'

import ModifyStockPerElement from '../ModifyStockPerElement/ModifyStockPerElement';
import CustomTable from '../CustomTable/CustomTable'

const ReviewStockModifications = ({ productsNewStock, confirmModifications, changeStock }) => {
  return (
    <div className={style.container}>
      <h2> Modifica stocul produselor</h2>
      {productsNewStock.map(product => <ModifyStockPerElement product={product} changeStock={changeStock} />)}
      <h2> Modificari aduse stocului </h2>
      <div className={style.modifyHistory}>
        <CustomTable items={productsNewStock || []} headerConfig={reviewModificationHeader} />
      </div>
      <Button className={style.confirm} variant="outlined" color="success" onClick={() => confirmModifications()}> Confirma modificari </Button>
    </div>
  )
}

export default ReviewStockModifications
