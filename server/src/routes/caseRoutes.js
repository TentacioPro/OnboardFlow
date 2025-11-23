const express = require('express');
const router = express.Router();
const { getCases, getCaseById } = require('../controllers/caseController');
const authorize = require('../middleware/auth');

router.get('/', authorize(['hr-manager', 'candidate']), getCases);
router.get('/:id', authorize(['hr-manager', 'candidate']), getCaseById);

module.exports = router;
