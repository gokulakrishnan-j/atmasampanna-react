import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Cart.css'

function Cart({cartNo,setAdding,setCart,cartValue,details}) {
    const navigate = useNavigate()

    


const handleClerCart =()=>{
    setCart([])
    setAdding('')
    cartValue('')
    alert("Your cart cleared")
}
var total = 0;




  if(cartNo.length !== 0){
  total = cartNo.reduce((acc,curr)=>acc + curr)
 
  }
 

  return (
    <div className='carts' >
        <span onClick={()=>handleClerCart()} className='clearButton'>Clear Cart</span>
        <div className='cartBox'>
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

        </div>
        <div>
            <h5>Total</h5>
            <p>{total}</p>
            </div>
        <div>
            <button className='backButton' onClick={()=>navigate(-1)} >BACK</button>
        </div>
    </div>
  )
}

export default Cart
