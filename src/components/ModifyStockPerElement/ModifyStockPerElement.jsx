

const ModifyStockPerElement = ({ product, changeStock }) => {
    return (
        <>
            <div> {product.name} </div>
            <div>
                <button className='w-8 bg-blue-500 rounded-lg text-center text-white' onClick={() => changeStock(product.id, 'newSealedQuantity', -1)}>-</button>
                <button className="w-10 text-center">{product.newSealedQuantity}</button>
                <button className='w-8 bg-blue-500 rounded-lg text-center text-white' onClick={() => changeStock(product.id, 'newSealedQuantity', 1)}>+</button>
            </div>
             <div>
                 <button className='w-8 bg-blue-500 rounded-lg text-center text-white' onClick={() => changeStock(product.id, 'newUnsealedQuantity', -1)}>-</button>
                <button className="w-10 text-center">{product.newUnsealedQuantity}</button>
                <button className='w-8 bg-blue-500 rounded-lg text-center text-white' onClick={() => changeStock(product.id, 'newUnsealedQuantity', 1)}>+</button>
            </div>
        </>
    )
}

export default ModifyStockPerElement;
