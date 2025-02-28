import { useState } from "react";
import { signUp, logIn } from "../firebase";
import click from "../assets/click.mp3";

export default function AuthModal({ close }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle for login/signup
  
  async function handleLogin() {
    try {
      await logIn(email, password);
      close(); // Close modal after successful login
      window.location.reload(); // Refresh homepage
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  }

  async function handleSignup() {
    try {
      await signUp(email, password);
      close(); // Close modal after successful signup
      window.location.reload(); // Refresh homepage
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative py-32">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={close}>
          ✕
        </button>

        {/* Login / Signup Form */}
        <h2 className="text-lg font-bold mb-4 text-black">{isSignup ? "Sign Up" : "Sign In"}</h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-black p-2 rounded w-full mb-2 placeholder-gray-500 text-gray-500 focus:text-black peer focus:border-[#ff7f7f] focus:ring-1 focus:ring-[#ff7f7f] focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-black p-2 rounded w-full mb-2 placeholder-gray-500 text-gray-500 focus:text-black peer focus:border-[#ff7f7f] focus:ring-1 focus:ring-[#ff7f7f] focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login / Signup Button */}
        <button
          className="bg-[#ff7f7f] text-white px-4 py-2 rounded w-full"
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Sign Up" : "Log In"}
        </button>

        {/* Toggle Sign In / Sign Up */}
        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignup ? "Already have an account?" : "No account?"}{" "}
          <button
            className="text-[#ff7f7f] font-semibold hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}