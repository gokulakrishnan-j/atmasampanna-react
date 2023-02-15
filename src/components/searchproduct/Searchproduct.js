import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Searchproduct.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


//geting searched products
function Searchproduct({searchedProducts}) {
  const {email} = useParams()
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
          <div key={index} className="productSearched" onClick={()=>navigate(`/detail/${email}/${product._id}`)}>
            <div ><img src={product.image} className='productImage' alt={product.name}/></div>
            <div className='productName'><h6>{product.name}</h6>
            <p>₹{product.price}</p>
         
            </div>
          </div>
        ))}
        </div>
}
    </div>
  )
}

export default Searchproduct