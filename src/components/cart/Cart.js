import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Cart.css'
import StripeCheckout from "react-stripe-checkout"

function Cart({cartNo,setAdding,setCart,cartValue,details}) {
    const navigate = useNavigate()
    const [totalPrice,setTotalPrice] = useState([])
    const [total,setTotalQuantity] = useState(0)
    const [placedOrder,setPlacedOrder] = useState(false)
    const [showPlaceOrderButton,setShowPlaceOrderButton] = useState(true)
    
   const onToken = (token) => {
    setPlacedOrder(true)
    setShowPlaceOrderButton(false)
        alert("Your order placed sucessfully✨ ")
      }


const handleClerCart =()=>{
    if(totalPrice.length <1 ){
        alert("Cart already cleared")
    }else{
        setCart([])
        setAdding('')
        cartValue('')
        setTotalPrice([])
        setTotalQuantity(0)
        setShowPlaceOrderButton(false)
        alert("Your cart cleared")
    }
    
}




useEffect(()=>{
    if(cartNo.length !== 0){
        setTotalQuantity(cartNo.reduce((acc,curr)=>acc + curr))
        setTotalPrice( details.map((n)=>parseInt(n.detail.price) * parseInt(n.quantity)) )
       
        }
},[details,cartNo])
  


  return (
    <div className='carts' >
        { showPlaceOrderButton && totalPrice.length >0 ?
        <span onClick={()=>handleClerCart()} className='clearButton'>Clear Cart</span>:null}
        <div className='cartBox'>

            {placedOrder?
            <div>
                <h4>Placed Order</h4>{
                details.map((n,index)=>(
        <div key={index} className='cartProduct'>
            <div>
                <h5>Name</h5>
            <p>{n.detail.name}</p>
            </div>
            <img src={n.detail.image} className="cartImage" alt={n.name} />
            <div>
                <h6>Quantity</h6>
                <p>{n.quantity}</p>
                <h5>Price ₹</h5>
            <p>{n.detail.price}</p>
            </div>
        </div>
        )) }

<div>
    <h5>Total amount</h5>
                <h5>{totalPrice.reduce((acc,curr)=>acc+curr)}</h5>
            </div>
                </div> :

       
            <div>
            
        {
        details.map((n,index)=>(
        <div key={index} className='cartProduct'>
            <div>
                <h5>Name</h5>
            <p>{n.detail.name}</p>
            </div>
            <img src={n.detail.image} className="cartImage" alt={n.name} />
            <div>
                <h6>Quantity</h6>
                <p>{n.quantity}</p>
                <h5>Price ₹</h5>
            <p>{n.detail.price}</p>
            </div>
            
        </div>
        ))
    }
    
        </div>
}
        </div>
        <div>
        { showPlaceOrderButton && totalPrice.length >0 ?
        <div>
            <h5 style={{"marginTop":"12px"}}>Total quantity</h5>
            <p>{total}</p>
            </div>:null}

{ showPlaceOrderButton && totalPrice.length >0 ?
            <StripeCheckout
        token={onToken}
        name={"Place Order"}
        currency={"INR"}
        amount={totalPrice.length >0 ?totalPrice.reduce((acc,curr)=>acc+curr) * 100:0}
        stripeKey="pk_test_51Mq9WpSJhZc5Nhrdd7R4U6RVGd0xN4YNLOsnsx4psJJhyX8hT98YDP6O9IAOiw1fpzgKoCZYHCYvNtWBqLqzfL1f00NwVAHu9k"
      >
            <p className='placeOrder'>Place order ₹ {totalPrice.length >0 ?totalPrice.reduce((acc,curr)=>acc+curr):0}</p>
           </StripeCheckout>:null
}
            </div>
            <br/>
        <div>
            <button className='backButton' onClick={()=>navigate(-1)} >BACK</button>
        </div>
    </div>
  )
}

export default Cart
