import "./App.css";
import { commerce } from "./lib/commerce";
// import Navbar from './components/Navbar/Navbar';
// import Products  from './components/products/Products';

import { Products, Navbar, Cart,Checkout } from "./components";
import { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order,setOrder]=useState({})
  const [errMsg,setErrorMsg]= useState({})
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    console.log("data", data);
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddtoCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };


  const handleUpdateQty = async(productId,quantity) => {
    const {cart} = await commerce.cart.update(productId,{quantity})
    setCart(cart)
  }

  const handleRemoveFromCart = async(productId) => {
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart)
  }

  const handleEmptyCart = async() =>{
      const {cart}  = await commerce.cart.empty();
      setCart(cart)
  }

  const refreshCart = async () =>{
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId,newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
      setOrder(incomingOrder);
      refreshCart()
    } catch (error) {
        setErrorMsg(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("products", products);
  console.log("cart", cart);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddtoCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart}  handleUpdateQty={handleUpdateQty} 
            handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>
          </Route>
          <Route exact path='/checkout'>
                <Checkout cart={cart} 
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errMsg}
                />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
