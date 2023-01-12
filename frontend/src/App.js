import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';




 
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {" "}
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />}/>
            <Route path="/payment" element={<PaymentScreen />}/>
            <Route path="/placeorder" element={<PlaceOrderScreen />}/>
            <Route path="/order/:id" element={<OrderScreen />}/>
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />


            <Route path="/admin/userList" element={<UserListScreen />} />



          </Routes>
        </Container>
      </main>
      <footer />
    </BrowserRouter>
  );
}

export default App;
