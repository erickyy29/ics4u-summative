import { useStoreContext } from "../context/Context";
import { useNavigate } from "react-router";
import './AddCart.css';


function AddToCartButton({ movie, variant }) {
  const navigate = useNavigate();
  const { cart, setCart, user } = useStoreContext();

  const handleAddToCart = () => {
    if (user) {
      const updatedCart = cart.has(movie.id)
        ? cart.delete(movie.id)
        : cart.set(movie.id, movie);
      setCart(updatedCart);
    } else {
      navigate('/signin');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`add-to-cart-button ${variant ? variant : ""}`}
    >
      {cart.has(movie.id) ? "Added" : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;