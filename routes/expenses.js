const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// ✅ Seed sample data (POST)
router.post('/seed', async (req, res) => {
  try {
    const sampleExpenses = [
      { title: 'Groceries', amount: 1200, category: 'Food', date: new Date('2025-09-01') },
      { title: 'Bus Pass', amount: 500, category: 'Transport', date: new Date('2025-09-03') },
      { title: 'Movie Night', amount: 300, category: 'Entertainment', date: new Date('2025-09-05') },
      { title: 'Electricity Bill', amount: 1500, category: 'Utilities', date: new Date('2025-09-06') }
    ];
    await Expense.insertMany(sampleExpenses);
    res.json({ message: 'Sample data added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
