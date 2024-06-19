const express = require('express');
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');


const router = express.Router();

router.use( productRoutes);
router.use('/auth', authRoutes);
 

module.exports = router;