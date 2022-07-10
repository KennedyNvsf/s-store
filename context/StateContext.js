import React,{createContext, useContext, useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({children}) => { 

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //adding item to cart
  const onAddToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //checking if already in cart
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if(cartItems._id === product._id) return {
            ...cartItem,
            quantity: cartItem.quantity + quantity
        }
      });
      setTotalPrice(updatedCartItems); 
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]); 
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  }

  //removing item from cart
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    let newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice((prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity));
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity); 
    setCartItems(newCartItems);
  };

  //toggle cart quantity
  const toggleCartItemQty = (id, value) => {
     foundProduct = cartItems.find((item) => item._id === id); 
     index = cartItems.findIndex((product) => product._id === id); 
     let newCartItems = cartItems.filter((item) => item._id !== id);

     if (value === 'inc') { 
      setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);

     } else if (value === 'dec') {

      if (foundProduct.quantity > 1) {
       
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice -  foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
     }
  }
  //increase quantity
  const incQty = () => {
    setQty((previousQty) => previousQty + 1)
  }
  //decrease quantity
  const decQty = () => {
    setQty((previousQty) => {
       
      if(previousQty - 1 < 1) return 1; 

      return previousQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAddToCart,
        toggleCartItemQty,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
} 

export const useStateContext = () => useContext( Context)
