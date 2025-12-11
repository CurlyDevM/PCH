import { useContext, useRef } from 'react';
import { useReactToPrint } from "react-to-print";

import Context from '../Context';

const Stock = () => {

    const contentRef = useRef();
    const { products } = useContext(Context);

    console.log('products', products)

    const handlePrint = useReactToPrint({ contentRef })

    return (
        <div>
            <div className="w-[50vw] mx-auto grid grid-cols-[1fr_auto_auto] py-10 text-base print:text-sm print:grid-cols-[2fr_1fr_1fr] print:w-[80vw]" ref={contentRef}>
                <div className='px-5 print:text-sm'>Nume produs</div>
                <div className='px-3 justify-self-center print:text-sm'>Cantitate sigilata</div>
                <div className='px-3 justify-self-center mb-5 print:text-sm'>Cantitate desfacuta</div>
                {products.map(product => (
                    <>
                        <div className='px-5 print:text-sm'> {product.name} {product.weightToDisplay} </div>
                        <div className='px-3 justify-self-center print:text-sm'> {product.sealed_quantity} </div>
                        <div className='px-3 justify-self-center print:text-sm'> {product.unsealed_quantity} </div>
                        <div className='col-span-full h-0.5 bg-gray-500 print:text-sm' >  </div>
                    </>
                ))}
            </div>
            <button className='fixed right-20 top-50 bg-blue-500 text-white px-5 py-3 rounded-lg' onClick={handlePrint}> Printeaza </button>
        </div>
    )

}

export default Stock;