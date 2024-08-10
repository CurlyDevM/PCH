import React from 'react'
import Product from '../Product/Product';

const AddProduct = ({ addElement }) => {
  return (
    <div>
        <Product addElement={addElement} />
    </div>
  )
}

export default AddProduct;
