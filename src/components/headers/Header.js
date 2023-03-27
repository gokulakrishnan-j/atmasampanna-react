import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../global/connect'
import './Header.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function Header({searchedProducts,userDetails,cart,cartValues}) {
  const navigate = useNavigate()

  //searching products
const [searchProduct,setSerchProduct] = useState()
// geting searched products
const [getSearchedProducts,setGetSearchedProducts] =useState([])
// dropdown for product list 
const [searchList,setSearchList] =useState([])
// toggle button for dropdown logout button
const [toggle,setToggle]=useState(false)

const [cartValue,setCartValue] = useState()

useEffect(()=>{
setCartValue(cartValues)
},[cartValues])


useEffect(()=>{
 
if(cart.length !== 0){
const add = cart.reduce((acc,curr)=>acc + curr)
setCartValue(add)
}
},[cart])

// sending product details to searchproduct component
useEffect(()=>{
  searchedProducts(getSearchedProducts)
},[getSearchedProducts,searchedProducts])


// searching a products
  const handleSearch = (value)=>{

    if(value){
    fetch(`${API}/product/${value}`,{
      headers:{'my_token':localStorage.getItem("token"),}
    })
    .then((data)=>data.json())
    .then((value)=>setGetSearchedProducts(value))

    // navigating to searchproduct component
navigate(`search-products/${userDetails.email}/${value}`)
// making input field empty afert search
setSerchProduct('')
    }
  }

  useEffect(()=>{
// geting product details for dropdown
    if(searchProduct){
    fetch(`${API}/product/${searchProduct}`,{
      headers:{'my_token':localStorage.getItem("token"),}
    })
.then((data)=>data.json())
.then((value)=>setSearchList(value))

    }
  },[searchProduct])
 
  const handleLogout = (email)=>{
    // deleting a token when user logout 
   fetch(`${API}/user/logout/${email}`,{
     method: 'DELETE', 
     headers:{'my_token':localStorage.getItem("token")}
   })
   .then(()=>(navigate('/login')))
   .then(()=>localStorage.removeItem("token"))
  }
  return (
    <div className='header'>
      <nav id='navBar' >
      {/*brand name*/}
        <div className='brandName'>Atmasampanna Masala</div>
        {localStorage.getItem("token")?
        //toggle button
<div className='usernameBox' ><span className='username' onClick={()=>toggle?setToggle(false):setToggle(true)}>{userDetails.username}<ArrowDropDownIcon/></span></div>:null
        
  }
   {localStorage.getItem("token") && toggle?
   // logout button
     <div className='logout'><button className='logoutButton' onClick={()=>handleLogout(userDetails.email)}>Logout</button></div>:null
        
  }
  

  <div className='headersSearchBox'>
    {/*search input field */}
    <input className="form-control mr-sm-2" id='headersSearchBoxInput' value={searchProduct} type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSerchProduct(e.target.value)}/>
    {/*search button*/}
    <button id='searchButton' className="btn btn-outline-success my-2 my-sm-0" onClick={()=>handleSearch(searchProduct)}>Search</button>
    </div>
    {localStorage.getItem("token")?
   <div className='cart'>
    <ShoppingBasketIcon onClick={()=>navigate(`/cart/${userDetails.email}`)}/> {cartValue ? cartValue :0}
   </div>:null}
</nav>
<div>{
      searchProduct && localStorage.getItem("token") ?
      // spliting a individual product name and puting it in handlesearch
      <div className='searchListBox'>{
        searchList.map((product,index)=>(
        <p className='searchList' key={index} onClick={(e)=>handleSearch(`${e.target.innerText.split(' ')[0]} ${e.target.innerText.split(' ')[1]}`)}>{product.name}</p>
      ))}</div>:null
      
      }</div>
    </div>
  )
}

export default Header