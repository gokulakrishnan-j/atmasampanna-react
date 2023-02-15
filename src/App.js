import './App.css';
import Header from './components/headers/Header';
import Product from './components/products/Product';
import Footer from './components/footers/Footer';
import {Routes,Route, Navigate} from 'react-router-dom'
import Searchproduct from './components/searchproduct/Searchproduct';
import { useState,useEffect } from 'react';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import DetailsOfProduct from './components/details0fproduct/DetailsOfProduct';
import Cart from './components/cart/Cart';
import { API } from './global/connect';

function App() {

  // geting seached product from header component
  const [getSearchedProducts,setGetSearchedProducts] = useState([])

  // geting user details from product component
  const [userDetails,setUserDetails] = useState({})

  const [addingCart,setAddingCart] = useState([])
  const [cartProductId,setCartProductId] = useState()

  const [product,setProduct] = useState([])
  const [cartValue,setCartValue] = useState()

  const [details , setDetails] = useState([])

  



  useEffect(()=>{
    if(cartProductId){
      fetch(`${API}/product/details/${cartProductId}`,{
  
        //geting token from local storage and send it in headers
        headers:{'my_token':localStorage.getItem("token"),}
      })
  .then((data)=>data.json())
  .then((value)=>setProduct((list)=>[...list,value]))
    }
    },[cartProductId])


    useEffect(()=>{
      const details = []
      for(let i =0 ;i<product.length;i++){
    
        const obj = {
          detail:product[i],
          quantity : ''
        }
    
        details.push(obj)
  
      }

      for(let i = 0;i<addingCart.length;i++){

        details[i].quantity = addingCart[i]
      }
      setDetails(details)
    },[product])
    

  return (
    <div className="App">
      
      {/* header component */}
      <Header searchedProducts={setGetSearchedProducts} cart={addingCart} cartValues={cartValue} userDetails={userDetails}/>
      
      {/* using routes to navigate */}
      <Routes>

        {/* using route for navigate to searchproduct  component*/}
        <Route path='/search-products/:email/:product' element={<Searchproduct searchedProducts={getSearchedProducts} userDetails={userDetails}/>}/>
      
      {/* using route for navigate to product component */}
      <Route path='/products/:email'element={< Product userDetails={setUserDetails}/>}/>
      
      {/* using route for navigate to signup component */}
      <Route path ='/signup' element={<Signup/>}/>

      {/* using route for navigate to login component */}
      <Route path ='/login' element={<Login/>}/>

      {/* using route and Navigate to show default component */}
      <Route path='*' element={<Navigate to='login'/>}/>

      <Route path='/detail/:email/:id' element={<DetailsOfProduct cart={setAddingCart}  cartId={setCartProductId}/> }/>

      <Route path='/cart/:email' element={<Cart cart={product} cartNo={addingCart} details={details}  cartValue={setCartValue} setAdding={setAddingCart} setCart={setProduct}/>}/>
      </Routes>

      {/* footer component */}
      <Footer/>
      
    </div>
  );
}

export default App;
