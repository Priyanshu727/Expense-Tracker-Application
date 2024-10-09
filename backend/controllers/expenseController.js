const mongoose = require('mongoose');
const Expense = require('../models/Expense'); // Ensure the Expense model is imported

// Function to create a new expense
const createExpense = async (req, res) => {
    try {
        const expenseData = req.body;

        // Validate that necessary fields are provided
        if (!expenseData.amount || !expenseData.description || !expenseData.date) {
            return res.status(400).json({ message: 'Amount, description, and date are required.' });
        }

        // Ensure amount is a number
        if (isNaN(expenseData.amount)) {
            return res.status(400).json({ message: 'Amount must be a valid number.' });
        }

        const newExpense = new Expense(expenseData); // Create a new expense instance
        await newExpense.save(); // Save the new expense to the database
        res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Error creating expense', error });
    }
};

// Function to get all expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find(); // Retrieve all expenses from the database
        res.status(200).json(expenses); // Respond with the expenses
    } catch (error) {
        console.error('Error retrieving expenses:', error);
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
};

// Function to get a single expense by ID
const getExpenseById = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }

    try {
        const expense = await Expense.findById(id); // Find the expense by ID

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' }); // If no expense is found
        }

        res.status(200).json(expense); // Respond with the found expense
    } catch (error) {
        console.error('Error retrieving expense by ID:', error);
        res.status(500).json({ message: 'Error retrieving expense', error });
    }
};
// Function to update an expense by ID
const updateExpense = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true }); // Update the expense and return the new version

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' }); // If no expense is found
        }

        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense }); // Respond with the updated expense
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense', error });
    }
};

// Function to delete an expense by ID
const deleteExpense = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }

    try {
        const deletedExpense = await Expense.findByIdAndDelete(id); // Find and delete the expense by ID

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' }); // If no expense is found
        }

        res.status(200).json({ message: 'Expense deleted successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense', error });
    }
};



// Add expense via CSV upload
const uploadCSV = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', file.filename);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                const expenses = results.map((row) => {
                    if (!row.amount || !row.description || !row.date) {
                        console.error('Missing required fields in row:', row);
                        return null;
                    }

                    const amount = parseFloat(row.amount);
                    if (isNaN(amount)) {
                        console.error('Invalid amount in row:', row);
                        return null;
                    }

                    return {
                        amount: amount,
                        description: row.description,
                        category: row.category || 'Uncategorized',
                        paymentMethod: row.paymentMethod || 'Cash',
                        date: new Date(row.date),
                        user: req.user ? req.user.id : null,
                    };
                }).filter(Boolean);

                if (expenses.length === 0) {
                    return res.status(400).json({ message: 'No valid expenses found to upload.' });
                }

                await Expense.insertMany(expenses);
                fs.unlinkSync(filePath);
                res.status(201).json({ message: 'Expenses uploaded successfully', uploadedCount: expenses.length });
            } catch (error) {
                console.error('Error uploading expenses:', error);
                res.status(500).json({ message: 'Error uploading expenses', error });
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Error reading CSV file', error });
        });
};

// Exporting the controller
module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    uploadCSV,
};
