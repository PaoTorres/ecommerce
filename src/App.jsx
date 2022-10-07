import { Container, Nav } from 'react-bootstrap'
import { HashRouter, Route, Routes } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import MyNavBar from './components/MyNavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Purchases from './pages/Purchases'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'
import { useEffect } from 'react'
import ProtectedRoutes from './components/ProtectedRoutes'
import './App.css'

function App() {
 
  const isLoading = useSelector (state=>state.isLoading);
  const productsList = useSelector(state=>state.products);
  const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getProductsThunk())
    }, [])

  return (
    <HashRouter>
      <MyNavBar />
      {isLoading && <LoadingScreen />}
      <Container classname="mt-5">
        <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
       
       <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
