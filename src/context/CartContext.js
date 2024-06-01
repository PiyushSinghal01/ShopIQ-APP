import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () =>{
    let data = localStorage.getItem('cart')
    if(data)
    {
        return JSON.parse(data);
    }
    else{
        return [];
    }
}

const initialState = {
    cart : getLocalCartData(),
    total_item : 0,
    total_price : 0,
    shipping_fee : 50000,
}

const CartProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) =>{
        dispatch({type : "ADD_TO_CART", payload : {id, color, amount, product}})
    }

    const removeItem = (id) =>{
        dispatch({type : "REMOVE_ITEM", payload : id})
    }

    useEffect(() => {
        const data = localStorage.getItem('item')
        if(data)
        {
            state.cart = (JSON.parse(data))
        }
    })

    useEffect(() => {
        dispatch({type : "CART_TOTAL_ITEM"})
        dispatch({type : "CART_TOTAL_PRICE"})
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])

    const clearCart = () =>{
        dispatch({type : "CLEAR_CART"})
    }

    const setIncrease = (id) =>{
        dispatch({type : "INCREMENT", payload : id})
    }
    
    const setDecrease = (id) =>{
        dispatch({type : "DECREMENT", payload : id})
    }


    return <CartContext.Provider value={{...state, addToCart, removeItem, clearCart, setIncrease, setDecrease}}>
        {children}
    </CartContext.Provider>
}

export const useCartContext = () =>{
    return useContext(CartContext);
}

export { CartProvider };