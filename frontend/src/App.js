import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';



 
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {" "}
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} exact />

          </Routes>
        </Container>
      </main>
      <footer />
    </BrowserRouter>
  );
}

export default App;
