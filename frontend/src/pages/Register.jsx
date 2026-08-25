import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Create account</h1>

        <label>Your name</label>

        <input
          type="text"
          placeholder="Enter your name"
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="At least 6 characters"
        />

        <label>Confirm password</label>

        <input
          type="password"
          placeholder="Re-enter password"
        />

        <button className="auth-button">
          Create account
        </button>

        <p className="auth-terms">
          By creating an account, you agree to
          ShopEase's Terms and Conditions.
        </p>

        <p className="existing-account">
          Already have an account?
          {" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;