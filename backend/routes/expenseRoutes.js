// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const { uploadCSV, createExpense, getExpenses,getExpenseById, deleteExpense,updateExpense } = require('../controllers/expenseController'); // Ensure these functions are imported

// Route  For getting an expense by ID
router.get('/:id', getExpenseById); 

// Define routes
router.post('/upload-csv', uploadCSV); // Use the CSV upload route

// Route for creating a new expense
router.post('/', createExpense); // This route will handle creating an expense

// Route for getting all expenses
router.get('/', getExpenses); // This can be used for retrieving all expenses
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
