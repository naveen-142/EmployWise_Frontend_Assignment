import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setError('');
      navigate('/users');
    } catch (err) {
      setError('Invalid login. Try using eve.holt@reqres.in / cityslicka');
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        required
        className="w-full border p-2 rounded mb-4"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
        className="w-full border p-2 rounded mb-4"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?{' '}
        <a href="/register" className="text-blue-500 underline">
          Register here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
