import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useStoreContext } from '../context/Context';
import { Map } from 'immutable';
import './SignUpView.css';

function SignUpView() {
  const navigate = useNavigate();
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState(null);

  const { setUser, setCart } = useStoreContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passInput !== confirmPass) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const user = (await createUserWithEmailAndPassword(auth, emailInput, passInput)).user;
      await updateProfile(user, { displayName: `${firstNameInput} ${lastNameInput}` });
      setUser(user);
      setCart(Map());
      navigate('/movies');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please use a different email.");
      } else {
        setError("Error creating user with email and password!");
      }
    }
  };

  const registerByGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      setUser(user);
      setCart(Map());
      navigate('/movies');
      console.log("navifatre /movies");
    } catch (error) {
      setError("Error creating user with Google!");
    }
  };

  return (
    <div>
      <div className="sign-up-page">
        <div className="sign-up">
          <h2>SIGN UP</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="info">
              <input type="text" name="first" onChange={(e) => setFirstNameInput(e.target.value)} required />
              <label>First Name</label>
            </div>
            <div className="info">
              <input type="text" name="last" onChange={(e) => setLastNameInput(e.target.value)} required />
              <label>Last Name</label>
            </div>
            <div className="info">
              <input type="email" name="email" onChange={(e) => setEmailInput(e.target.value)} required />
              <label>Email</label>
            </div>
            <div className="info">
              <input type="password" name="password" onChange={(e) => setPassInput(e.target.value)} required />
              <label>Password</label>
            </div>
            <div className="info">
              <input type="password" name="confirm-password" onChange={(e) => setConfirmPass(e.target.value)} required />
              <label>Confirm Password</label>
            </div>
            <button type="submit" className="register-button">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/signin">Login</Link>
          </p>
          <button onClick={registerByGoogle} className="register-button">Register by Google</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpView;