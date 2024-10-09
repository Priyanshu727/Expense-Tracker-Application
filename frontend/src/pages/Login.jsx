import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginUser(email, password);
            localStorage.setItem('token', token); // Store the token in local storage
            navigate('/'); // Redirect to Home after login
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-2 p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-4 p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
