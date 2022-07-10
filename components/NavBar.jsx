import React,{useContext} from 'react';
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { Cart } from '../components'

const NavBar = () => {

  const {showCart, setShowCart, totalQuantities} = useStateContext()
  return (

    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          SoundStore
        </Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">{totalQuantities }</span>
      </button>

      {showCart &&  <Cart/>}
    </div>
  )
}

export default NavBar; 
