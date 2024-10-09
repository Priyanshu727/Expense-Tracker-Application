// utils/cookieUtils.js
const generateCookie = (token) => {
    return {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only send the cookie if in production
        sameSite: 'Strict', // SameSite attribute to protect against CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day in milliseconds)
        // You can set the path or domain if needed
    };
};

module.exports = generateCookie;
