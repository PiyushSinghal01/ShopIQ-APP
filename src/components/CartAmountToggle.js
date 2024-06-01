import React from 'react'
import {FaPlus,FaMinus} from 'react-icons/fa'

const CartAmountToggle = ({amount, setIncrease, setDecrease}) => {
  return (
    <div className='cart-button'>
      <div className="amount-toggle">
        <button onClick={()=>setDecrease()}>
            <FaMinus></FaMinus>
        </button>
        <div className='amount-style'>{amount}</div>
        <button onClick={()=>setIncrease()}>
            <FaPlus></FaPlus>
        </button>
      </div>
    </div>
  )
}

export default CartAmountToggle
