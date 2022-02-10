const express = require('express');
const router = express.Router();

const { getApi } = require('../controllers/googleAPI');

router.get('/googleAPI', getApi);

module.exports = router;