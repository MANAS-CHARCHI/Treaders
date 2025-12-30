import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Vanilla email/password login
  const handleVanillaLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  // Google social login
  const handleGoogleSocialLogin = () => {
    window.location.href =
      "http://localhost:5001/auth/google/login/google-oauth2/";
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          margin: "10px 0",
          padding: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          margin: "10px 0",
          padding: "10px",
        }}
      />

      <button
        onClick={handleVanillaLogin}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        Login
      </button>

      <hr />

      <button
        onClick={handleGoogleSocialLogin}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login with Google
      </button>
    </div>
  );
}
