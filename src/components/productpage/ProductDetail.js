import { useState } from 'react';
import QuantityInput from '../common/QuantityInput';

function ProductDetail({ product, state, dispatch }) {
  const isProductAddedToCart = state.cart.find(
    (cartProduct) => cartProduct.id === product.id
  );

  const [quantity, setQuantity] = useState(0);

  const addProductToCart = () => {
    // If product is added to cart
    if (isProductAddedToCart) {
      dispatch({
        type: 'UPDATE_CART_ITEM',
        payload: {
          id: product.id,
          quantity: quantity
        }
      })

      // Use return so that the next code does not run if product is added to cart
      return;
    }

    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: {
        ...product,
        quantity: quantity
      }
    });
  };

  return (
    <div className="product-detail">
      <img
        src={product.image}
        alt={product.alt}
      />

      <div className="product-data">
        <h1>{product.title}</h1>
        <p className="product-info"> 
          <span className="text-secondary">{product.rating}</span>
          <span className="text-tertiary">{product.price}</span>
        </p>

        <div className="flex-container">
          <QuantityInput quantity={quantity} setQuantity={setQuantity}></QuantityInput>

          <button className="add-to-cart-button" disabled={!quantity} onClick={addProductToCart}>
            Add to cart
          </button>
        </div>
        {
          isProductAddedToCart
            ? <p className="cart-product-message">Added to cart</p>
            : null
        }
      </div>
    </div>
  )
}

export default ProductDetail;