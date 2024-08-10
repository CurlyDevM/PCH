import React, { useContext } from 'react';

import style from './Home.module.css'

//Components
import Context from '../Context';
import ProductsOnWarning from '../ProductsOnWarning/ProductsOnWarning';
import AllProducts from '../AllProducts/AllProducts';

const Home = () => {

  const  { products }  = useContext(Context);

  return (
      <div className={style.container}>
        <ProductsOnWarning products={products} />
        <AllProducts products={products} />
      </div>
  );
}

export default Home;
