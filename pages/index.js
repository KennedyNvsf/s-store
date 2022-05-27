import React, {Fragment} from 'react';
import {client} from '../lib/client';
//components
import { Product, HeroBanner, FooterBanner } from '../components';

const Home  = ({products, bannerData}) => {
  
  return (
    <Fragment>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
     
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Enhance your sound with our products</p>
      </div>

      <div className="products-container ">
        {products?.map((product) => <Product key={product.id} product={product} />)}
      </div>
      
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: {products, bannerData}
    }
}

export default Home ;
