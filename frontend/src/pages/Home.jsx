import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Expense Tracker</h1>
            <div className="flex space-x-4">
                <Link to="/login">
                    <button className="bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-green-500 text-white p-2 rounded">
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
