import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200" style={{ height: 600 }}>
        {/* Left side */}
        <div className="flex-1 bg-white px-10 py-12 flex flex-col">
          <div className="mb-10">
            <h1 className="font-playfair-italic text-2xl text-gray-200 select-none" style={{ userSelect: 'none' }}>
              APADE
            </h1>
          </div>
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(90deg, #0B1B0F 0%, #1B4B2B 100%)' }}
            >
              <img
                alt="Fillianta logo icon white on green gradient background"
                className="object-contain"
                height={28}
                src="https://storage.googleapis.com/a1aa/image/8341e609-267c-45f2-ffc7-fc605c70a0ed.jpg"
                width={28}
              />
            </div>
            <h2 className="font-semibold text-lg text-gray-900 mb-1">Get Started</h2>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              Welcome to Fillianta – Let’s create your account
            </p>
          </div>
          <hr className="border-gray-200 mb-8" />
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md w-full">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-green-800 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-700"
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <Link to="#" className="text-xs text-green-800 font-semibold hover:underline">
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-700"
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black/90 to-green-700 text-white text-xs font-semibold rounded-md py-2 mt-2"
            >
              Log in
            </button>
          </form>
          <p className="text-center text-gray-400 text-xs mt-4 max-w-xs mx-auto">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-gray-900 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1 relative rounded-tr-2xl rounded-br-2xl overflow-hidden" style={{ background: '#0B1B0F' }}>
          <img
            alt="Dark green gradient background with subtle light reflections"
            className="absolute inset-0 w-full h-full object-cover"
            height={600}
            src="https://storage.googleapis.com/a1aa/image/a5d941e0-0f3d-4235-ed80-be4c8a01efed.jpg"
            width={600}
          />
          <div className="relative z-10 h-full flex flex-col justify-center px-10 py-12 text-white text-right">
            <h1 className="font-playfair-italic text-5xl max-w-xs leading-snug mx-auto" style={{ lineHeight: 1.1 }}>
              Apade stock management
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
