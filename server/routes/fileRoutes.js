const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadFile, getHistory } = require('../controllers/fileController');

router.post('/upload', auth, uploadFile);
router.get('/history', auth, getHistory);

module.exports = router;
