import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../../global/connect'
import './Product.css'

function Product({userDetails}) {
  
  //geting email from url using useParams
  const {email} = useParams()

  const [token,settoken] = useState(null)

  useEffect(()=>{
     /* geting individual token */
    fetch(`${API}/user/token/${email}`)
    .then((data)=>data.json())
    .then((msg)=>settoken(msg))
    

     /* useEffect will triger when useParams.username get update || changed */
},[email])


 /* condition rendering . if token is return Nameofgroup component. if it false it return null*/
return token ? <ProductList tokenData={token} userDetails={userDetails} /> : null
}


function ProductList({tokenData , userDetails}){

  const {email} = useParams()

const [products,setProducts] = useState([])

// storing a token in local storage
localStorage.setItem("token",tokenData.my_token)

// geting proucts details
  useEffect(()=>{
    fetch(`${API}/product`,{

      //geting token from local storage and send it in headers
      headers:{'my_token':localStorage.getItem("token"),}
    })
.then((data)=>data.json())
.then((value)=>setProducts(value))

  },[])


 useEffect(()=>{
  // geting user details 
 fetch(`${API}/user/${email}`,{
  headers:{'my_token':localStorage.getItem("token")}
})
 .then((data)=>data.json())
 .then((msg)=>userDetails(msg))
 

},[email,userDetails])


  return (
    <div>
     
    {/* listing products */}
      <div className='productList'>
      {products.map((product,index)=>(
        <div className='products' key={index}>
          <img src={product.image} className='productImage' alt={product.name}/>
          <div className='productName'><h6>{product.name}</h6>
          <p>₹{product.price}</p>
          <button type="button" className="btn btn-secondary">Add to cart</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Product