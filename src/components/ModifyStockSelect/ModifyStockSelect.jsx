import { useState, useContext, useEffect } from 'react'

import Context from '../Context';
import Button from '@mui/material/Button';
import Select from "react-select";

import style from './ModifyStockSelect.module.css'


const ModifyStockSelect = ({ modifyMode, onSetNewStock, setModifyMode }) => {

    const { products } = useContext(Context);

    const [productsSelected, setProductsSelected] = useState([]);
    const [productsFormated, setProductsFormated] = useState(products.map( product => {
      return {
        value: product.barcode,
        label: `${product.name} ${product.weight}`
      }
    }));

    const onSelectCompleted = () => {
        setModifyMode(true);
        const productsToSend = products.filter( product => {
          console.log(productsSelected);
          if(productsSelected.find( selected => selected.value === product.barcode)){
            return product
          }
        })
        console.log('productsToSend', productsToSend)
         onSetNewStock(productsToSend.map(product => {
          return {
            ...product,
            newUnsealedQuantity: product.unsealed_quantity,
            newSealedQuantity: product.sealed_quantity
          }
        }))
      }


  return (
    <div className={`${style.container} selectMode`}>
      <h4> Selecteaza manual</h4>
          <Select
            isMulti
            options={productsFormated}
            value={productsSelected}
            onChange={setProductsSelected}
            placeholder="Selecteaza"
            className='w-72'
          />
          <button
            className="text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 my-5 bg-green-500 hover:bg-green-600 mx-5" 
            onClick={() => onSelectCompleted()}
            disabled={modifyMode || productsSelected.length === 0}
          > 
            Selecteaza 
          </button>

    </div>
  )
}

export default ModifyStockSelect
