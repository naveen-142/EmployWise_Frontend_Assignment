import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post('/register', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Registration successful!');
      navigate('/users');
    } catch {
      alert('Registration failed. Try using "eve.holt@reqres.in" or another valid email from ReqRes.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <a href="/" className="text-blue-500 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
