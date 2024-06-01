import {React, useState} from 'react'
import FormatPrice from './FormatPrice'
import CartAmountToggle from './CartAmountToggle'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/CartContext'

const CartItem = ({id, name, image, color, price, amount}) => {

    const {removeItem, setIncrease, setDecrease} = useCartContext(); 

    // const [newAmount, setNewAmount] = useState(amount);

    // const setIncrease = () =>{
    //     newAmount < max ? setNewAmount(newAmount+1) : setNewAmount(max);
    // }
    // const setDecrease = () =>{
    //     newAmount > 1 ? setNewAmount(newAmount-1) : setNewAmount(1);
    // }

  return <div className='cart_heading grid grid-five-column'>
    <div className="cart-image--name">
        <div>
            <figure>
                <img src={image} alt={"img"} />
            </figure>
        </div>
        <div>
            <p>{name}</p>
            <div className="color-div">
                <p>color:</p>
                <div className="color-style" style={{background : color}}></div>
            </div>
        </div>
    </div>

    <div className="cart-hide">
        <p><FormatPrice price={price}></FormatPrice></p>
    </div>

    <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
    ></CartAmountToggle>

    <div className="cart-hide">
        <p><FormatPrice price={price*amount}></FormatPrice></p>
    </div>

    <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)}></FaTrash>
    </div>
  </div>
}

export default CartItem