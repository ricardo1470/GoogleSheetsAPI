const express = require('express');
const router = express.Router();

const { getInit } = require('../controllers/init');

router.get('/', getInit);

module.exports = router;
