import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Sign in</h1>

        <label>Email or mobile phone</label>

        <input
          type="text"
          placeholder="Enter your email"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
        />

        <button className="auth-button">
          Sign in
        </button>

        <p className="auth-terms">
          By continuing, you agree to ShopEase's
          Terms and Conditions.
        </p>

        <div className="auth-divider">
          <span>New to ShopEase?</span>
        </div>

        <Link
          to="/register"
          className="create-account"
        >
          Create your ShopEase account
        </Link>

      </div>

    </div>
  );
}

export default Login;