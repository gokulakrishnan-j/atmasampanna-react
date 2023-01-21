import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Searchproduct.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


//geting searched products
function Searchproduct({searchedProducts}) {
    const navigate = useNavigate()
  
  return (
    <div className='searchproduct'>
      {/* back button */}
      <div className='searchedLogout'><KeyboardBackspaceIcon id='backButton'  onClick={()=>navigate(-1)}/></div>
        
        {

        <div className='productList'>
            
        {
          // showing searched product list
        searchedProducts.map((product,index)=>(
          <div key={index} className="productSearched">
            <div ><img src={product.image} className='productImage' alt={product.name}/></div>
            <div className='productName'><h6>{product.name}</h6>
            <p>₹{product.price}</p>
          <button type="button" className="btn btn-secondary">Add to cart</button>
            </div>
          </div>
        ))}
        </div>
}
    </div>
  )
}

export default Searchproduct