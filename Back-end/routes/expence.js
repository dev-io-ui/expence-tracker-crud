const path = require('path');

const express = require('express');

const expenceController = require('../controllers/expence');

const router = express.Router();




router.post('/add-expence', expenceController.postAddExpence);
router.get('/all-expence', expenceController.getAllExpence);
router.delete('/delete-expence/:id',expenceController.deleteExpence);
router.put('/edit-expence/:id',expenceController.editExpence);

module.exports = router;