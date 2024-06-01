import React from 'react'

const reducer = (state, action) => {
    if(action.type === "ADD_TO_CART")
    {
        let {id, color, amount, product} = action.payload;
        let cartProduct;

        let existingProduct = state.cart.find((curElem) => curElem.id === id+color)
        
        if(existingProduct)
        {
            let updatedCart = state.cart.map((curElem) => {
                if(curElem.id === id + color)
                {
                    let newAmount = curElem.amount + amount;

                    if(newAmount >= existingProduct.max)
                    {
                        newAmount = existingProduct.max;
                    }
                    return{
                        ...curElem,
                        amount : newAmount,
                    }
                }
                else{
                    return{
                        ...curElem,
                    }
                }
            })

            return{
                ...state,
                cart : updatedCart,
            }
        }
        else{
            cartProduct = {
                id : id + color,
                name : product.name,
                color : color,
                amount : amount,
                image : product.image[0].url,
                price : product.price,
                max : product.stock,
            }

            return{
                ...state,
                cart : [...state.cart, cartProduct]
            }
        }
    }
    if(action.type === "REMOVE_ITEM")
    {
        let id = action.payload
        let {cart} = state;

        let newCart = cart.filter((curElem) => {
            return (curElem.id !== id)
        })

        return{
            ...state,
            cart : newCart
        }
    }

    if(action.type === "CLEAR_CART")
    {
        return{
            ...state,
            cart : [],
        }
    }

    if(action.type === "INCREMENT")
    {
        let id = action.payload;
        let updatedCart = state.cart.map((curElem) => {
            if(curElem.id === id)
            {
                let newAmount = curElem.amount + 1
                if(newAmount >= curElem.max)
                {
                    newAmount = curElem.max
                }
                return{
                    ...curElem,
                    amount : newAmount,
                }
            }
            else{
                return{
                    ...curElem
                }
            }
        })

        return{
            ...state,
            cart : updatedCart,
        }
    }

    if(action.type === "DECREMENT")
    {
        let id = action.payload;
        let updatedCart = state.cart.map((curElem) => {
            if(curElem.id === id)
            {
                let newAmount = curElem.amount - 1
                if(newAmount < 1)
                {
                    newAmount = 1;
                }
                return{
                    ...curElem,
                    amount : newAmount,
                }
            }
            else{
                return{
                    ...curElem
                }
            }
        })

        return{
            ...state,
            cart : updatedCart,
        }
    }

    if(action.type === "CART_TOTAL_ITEM")
    {
        let totalAmount = state.cart.reduce((previousValue, curElem) => {
            return previousValue + curElem.amount;
        }, 0)

        return{
            ...state,
            total_item : totalAmount,
        }
    }

    if(action.type === "CART_TOTAL_PRICE")
    {
        let totalPrice = state.cart.reduce((previousValue, curElem) => {
            return previousValue + (curElem.price * curElem.amount);
        }, 0)

        return{
            ...state,
            total_price : totalPrice,
        }
    }

  return {
    ...state
  }
}

export default reducer;