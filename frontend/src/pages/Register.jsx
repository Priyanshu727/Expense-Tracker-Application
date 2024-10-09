import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            navigate('/login'); // Redirect to Login after successful registration
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Register</h1>
            <form onSubmit={handleRegister} className="flex flex-col">
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
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
