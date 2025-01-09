import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useStoreContext } from '../context/Context';
import './SignInView.css';

function SignInView() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [error, setError] = useState(null);

  const { setUser } = useStoreContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = (await signInWithEmailAndPassword(auth, emailInput, passInput)).user;
      setUser(user);
      navigate('/movies');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError("No user found with this email. Please register first.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Error signing in with email and password!");
      }
    }
  };

  const signInByGoogle = async () => {
    try {
      const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
      setUser(user);
      navigate('/movies');
    } catch (error) {
      setError("Error signing in with Google!");
    }
  };

  return (
    <div>
      <div className="sign-in-page">
        <div className="sign-in">
          <h2>SIGN IN</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="info">
              <input
                type="email"
                name="email"
                onChange={(event) => setEmailInput(event.target.value)}
                required
                value={emailInput}
              />
              <label>Email</label>
            </div>
            <div className="info">
              <input
                type="password"
                name="password"
                onChange={(event) => setPassInput(event.target.value)}
                required
                value={passInput}
              />
              <label>Password</label>
            </div>
            <button className="sign-in-btn" type="submit">Sign In</button>
            <button onClick={signInByGoogle} className="sign-in-btn">Sign In with Google</button>
            <div className="help">
              <Link to="#">Need help?</Link>
            </div>
          </form>
          <p>New to Aginflix? <Link to="/signup">Sign up now</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignInView;
