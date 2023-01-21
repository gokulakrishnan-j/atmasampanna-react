import './App.css';
import Header from './components/headers/Header';
import Product from './components/products/Product';
import Footer from './components/footers/Footer';
import {Routes,Route, Navigate} from 'react-router-dom'
import Searchproduct from './components/searchproduct/Searchproduct';
import { useState } from 'react';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';

function App() {

  // geting seached product from header component
  const [getSearchedProducts,setGetSearchedProducts] = useState([])

  // geting user details from product component
  const [userDetails,setUserDetails] = useState({})

  return (
    <div className="App">
      
      {/* header component */}
      <Header searchedProducts={setGetSearchedProducts} userDetails={userDetails}/>
      
      {/* using routes to navigate */}
      <Routes>

        {/* using route for navigate to searchproduct  component*/}
        <Route path='/search-products/:product' element={<Searchproduct searchedProducts={getSearchedProducts} userDetails={userDetails}/>}/>
      
      {/* using route for navigate to product component */}
      <Route path='/products/:email'element={< Product userDetails={setUserDetails}/>}/>
      
      {/* using route for navigate to signup component */}
      <Route path ='/signup' element={<Signup/>}/>

      {/* using route for navigate to login component */}
      <Route path ='/login' element={<Login/>}/>

      {/* using route and Navigate to show default component */}
      <Route path='*' element={<Navigate to='login'/>}/>
      </Routes>

      {/* footer component */}
      <Footer/>
      
    </div>
  );
}

export default App;
