import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';



 
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
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />


          </Routes>
        </Container>
      </main>
      <footer />
    </BrowserRouter>
  );
}

export default App;
