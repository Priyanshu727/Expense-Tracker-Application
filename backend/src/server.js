// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db'); // Corrected path
const multer = require('multer');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // Ensure the uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

connectDB();

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/expenses', require('../routes/expenseRoutes'));

// CSV upload route
app.post('/api/expenses/upload-csv', upload.single('csvFile'), require('../controllers/expenseController').uploadCSV);

const PORT = process.env.PORT || 8084;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err, "server is not started");
    } else {
        console.log(`listening on port: http://localhost:${PORT}`);
    }
});
