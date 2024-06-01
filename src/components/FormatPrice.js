import React from 'react'

const FormatPrice = (props) => {
  return (
        Intl.NumberFormat("en-In", {
        style : "currency",
        currency : "INR",
        maximumFractionDigits : 2,
    }).format(props.price / 100)
    );
}

export default FormatPrice
