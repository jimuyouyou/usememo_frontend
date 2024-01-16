"use client"
import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Basic email and password validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // Add your login logic here (e.g., API call, authentication)
    console.log(`Logging in with email: ${email} and password: ${password}`);
  };

  const handleSignup = () => {
    // Basic email and password validation for signup
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password for signup.");
      return;
    }

    // Add your signup logic here (e.g., API call, user registration)
    console.log(`Signing up with email: ${email} and password: ${password}`);
  };

  return (
    <div>
      <Header />
      <section>
        <h1>{isSignup ? "Signup" : "Login"}</h1>
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="button" onClick={isSignup ? handleSignup : handleLogin}>
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account? "}
          <button type="button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login here" : "Signup here"}
          </button>
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
