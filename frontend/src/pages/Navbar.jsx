import { useState } from 'react';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // Add your search logic here
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-gray-800">Expense Tracker</h1>
                </div>

                {/* Main Content Area */}
                <div className="flex items-center space-x-4">
                    {/* Desktop Search Form */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search expenses..."
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Search
                        </button>
                    </form>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4">
                        <a href="/" className="text-gray-800 hover:text-blue-500">Home</a>
                        <a href="/add-expense" className="text-gray-800 hover:text-blue-500">Add Expense</a>
                        <a href="/about" className="text-gray-800 hover:text-blue-500">About</a>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
                <form onSubmit={handleSearch} className="flex items-center space-x-2 px-4 py-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search expenses..."
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Search
                    </button>
                </form>
                <div className="flex flex-col px-4 py-2 space-y-2">
                    <a href="/" className="text-gray-800 hover:text-blue-500">Home</a>
                    <a href="/add-expense" className="text-gray-800 hover:text-blue-500">Add Expense</a>
                    <a href="/about" className="text-gray-800 hover:text-blue-500">About</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
