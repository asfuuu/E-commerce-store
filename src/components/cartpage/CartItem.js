import QuantityInput from '../common/QuantityInput';

function CartItem({ product, dispatch }) {
  const updateCartItemQuantity = (quantity) => {
    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: {
        id: product.id,
        quantity: quantity,
      },
    });
  };

  const removeCartItem = () => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
      payload: {
        id: product.id
      }
    });
  };

  return (
    <div className="cart-item">
      <button className="remove-cart-item-button" onClick={removeCartItem}>
        <span className="material-icons-outlined">
          delete
        </span>
      </button>
      <img src={product.image} alt={product.alt} />

      <div className="product-data">
        <h2>{product.title}</h2>
        <p>
          Price: <span>{product.price}</span>
        </p>

        <QuantityInput
          quantity={product.quantity}
          setQuantity={updateCartItemQuantity}
        />
      </div>
    </div>
  );
}

export default CartItem;
