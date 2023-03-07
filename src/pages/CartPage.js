import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/cartpage/CartItem';

function CartPage({ state, dispatch }) {
  const navigate = useNavigate();

  const getOrderTotal = () => {
    let total = 0;

    state.cart.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.priceInNumber;
    });

    return total
  };

  const emptyCart = () => {
    dispatch({
      type: 'EMPTY_CART'
    })
  };

  const completeOrder = () => {
    emptyCart();
    navigate('/order');
  };

  return (
    <div className="container cart-page">
      <div className="cart-page-header">
        <Link to="/" className="back-link">
          <span className="material-icons-outlined">arrow_back_ios</span>
          View all products
        </Link>

        {
          state.cart.length
            ? (<button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>)
            : null
        }
      </div>

      {
        !state.cart.length
          ? <h2>Your cart is empty. Explore products and add items to your cart.</h2>
          : null
      }

      <div className="cart-items-container">
        {state.cart.map((product, index) => {
          return (
            <CartItem
              key={index}
              product={product}
              dispatch={dispatch}
            ></CartItem>
          );
        })}
      </div>

      {
        state.cart.length
          ? (
            <div className="flex-container">
              <div className="left-container">
                <div className="delivery-fee-container">
                  <span>Delivery Fee:</span>
                  <span>300 PKR</span>
                </div>

                <div className="total-container">
                  <span>Total:</span>
                  <span>{getOrderTotal()} PKR</span>
                </div>
              </div>

              <div className="right-container">
                <button className="complete-order" onClick={completeOrder} disabled={!state.cart.length}>Complete Order</button>
              </div>
            </div>
          ) : null
      }
    </div>
  );
}

export default CartPage;
