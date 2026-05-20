import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

import API from "../services/api"

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "sales",
    })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      await API.post(
        "/auth/register",
        formData
      )

      toast.success("Registration successful")

      navigate("/")
    } catch (error) {
      toast.error("Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        >
          <option value="sales">
            Sales
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link
            to="/"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register