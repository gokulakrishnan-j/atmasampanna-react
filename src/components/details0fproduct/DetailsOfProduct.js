import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../global/connect'
import './DetailsOfProduct.css'

function DetailsOfProduct({cart,cartId}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product,setProduct] = useState()
    const [addToCart,setAddToCart] = useState(0)


    useEffect(()=>{
        fetch(`${API}/product/details/${id}`,{
    
          //geting token from local storage and send it in headers
          headers:{'my_token':localStorage.getItem("token"),}
        })
    .then((data)=>data.json())
    .then((value)=>setProduct(value))
    
      },[id])

    const handleAddToCart = ()=>{

  if(addToCart !== 0){
        cart((add)=>[...add,addToCart])
        cartId(id)
        navigate(-1)
  }else{
    alert("Choose the quantity")
  }
    }

  return (
    <div>
      {product ?
      <div>
        <div className='productList'>
            
          <img src={product.image} className='productImage' alt={product.name}/>
          <div className='productName'><h6>{product.name}</h6>
          <p>₹{product.price}</p>
          <div className='addButton'>
          <button type="button" className="btn btn-secondary" onClick={()=>setAddToCart(addToCart + 1)}>+</button>
          <span style={{padding:"8px"}}>{addToCart}</span>
          <button type="button" className="btn btn-secondary" onClick={()=>setAddToCart(addToCart > 0?addToCart - 1:0)}>-</button>
          </div>
          <button type="button" className="btn btn-secondary" onClick={()=>handleAddToCart()}>Add to cart</button>
    
        </div>
      </div>
        <div>
            <button className='backButton' onClick={()=>navigate(-1)}>BACK</button>
        </div>
        </div>
        :null}
    </div>
  )
}

export default DetailsOfProduct