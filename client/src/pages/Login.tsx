import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

import API from "../services/api"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      const { data } = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      )

      localStorage.setItem(
        "token",
        data.token
      )

      toast.success("Login successful")

      navigate("/dashboard")
    } catch (error) {
      toast.error("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4">
          No account?{" "}
          <Link
            to="/register"
            className="text-blue-500"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login