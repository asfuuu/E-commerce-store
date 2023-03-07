import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';

import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ReducerPage from './pages/ReducerPage';
import { useReducer } from 'react';

// Define Initial State
const initialState = {
  cart: []
};

// Define a reducer function -> (state, action) => newState
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      return {
        cart: [
          ...state.cart,
          // Contains the product data and the quantity
          action.payload
        ]
      }

    case 'UPDATE_CART_ITEM':
      // Find index of product in the cart
      const cartItemIndex = state.cart.findIndex((cartItem) => {
        return cartItem.id === action.payload.id;
      });

      // Update quantity of the product
      const updatedCart = [...state.cart];
      updatedCart[cartItemIndex].quantity = action.payload.quantity;
      // Return new state
      return {
        cart: updatedCart
      };

    case 'REMOVE_CART_ITEM':
      // Filter the cart item
      const filteredCartItems = state.cart.filter(cartItem => cartItem.id !== action.payload.id);

      return {
        cart: filteredCartItems
      }

    case 'EMPTY_CART':
      return {
        cart: []
      }

    default:
      throw new Error('No action found');
  }
};

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  return (
    <div className="App">
      <Navbar state={state} />
      <Routes>
        <Route path="/" element={<Homepage state={state} dispatch={dispatch} />}></Route>
        <Route path="/product/:id" element={<ProductPage state={state} dispatch={dispatch} />} ></Route>
        <Route path="/cart" element={<CartPage state={state} dispatch={dispatch} />} ></Route>
        <Route path="/order" element={<OrderPage />} ></Route>

        {/* Example Route */}
        <Route path="/reducer" element={<ReducerPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
