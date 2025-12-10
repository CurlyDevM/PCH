import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';


import { productsTableHeader } from '../../config';

const ProductsOnWarning = ({ products }) => {

    const [warningProducts, setWarningProducts] = useState([]);

    useEffect(() => {
        if (products) {
            const newWarningProducts = products.filter(product => {
                return Number(product.sealed_quantity) <= Number(product.warning_quantity)
            });
            setWarningProducts(newWarningProducts);
        }
    }, [products])

    if (warningProducts.length > 0) {
        return (
            <div>
                <h3> Produse ce nesecita atentia!</h3>
                <Table products={warningProducts} header={productsTableHeader} />
            </div>
        )
    } else return null;
}
export default ProductsOnWarning;