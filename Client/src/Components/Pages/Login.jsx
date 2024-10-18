import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, loginSuccess, setError } from '../../Redux/authSlice';
import GlobalApi from '../GlobalApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading());

      const response = await axios.post(`${GlobalApi.baseUrl}/auth/login`, { email, password });

      if (response.data && response.data.accessToken && response.data.refreshToken) {
        // Store tokens in cookies
        document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; Secure; SameSite=Strict`;

        // Dispatch login success to Redux
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );

        setLocalError('');
        dispatch(setError(null));

        const userRole = response.data.role;

        if (userRole === 'admin') {
          navigate('/dashboard');
        } else if (userRole === 'staff') {
          navigate('/staffdashboard');
        } else if (userRole === 'worker') {
          navigate('/DashboardLibrian');
        }
        alert('Login successful');
      } else {
        setLocalError('Invalid login credentials');
      }
    } catch (err) {
      dispatch(setError('Login failed. Please check your credentials.'));
      setLocalError('Invalid login credentials');
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Full Waves Background */}
      <div className="absolute inset-0 bg-black">
        {/* Top Wave */}
        <svg
          className="absolute top-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFD700"
            fillOpacity="1"
            d="M0,224L60,208C120,192,240,160,360,133.3C480,107,600,85,720,96C840,107,960,149,1080,160C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>

        {/* Bottom Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFD700"
            fillOpacity="1"
            d="M0,96L60,122.7C120,149,240,203,360,213.3C480,224,600,192,720,165.3C840,139,960,117,1080,128C1200,139,1320,181,1380,192L1440,203L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="leading-relaxed">
          <form onSubmit={handleLogin} className="p-10 bg-gray-800 bg-opacity-80 rounded shadow-xl text-white">
            <p className="mb-8 text-3xl font-light text-center text-yellow-400">Login</p>
            {localError && <p className="text-red-500 text-center">{localError}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 bg-gray-700 text-yellow-400 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 bg-gray-700 text-yellow-400 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Password"
                required
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
