const express = require('express');
const router = express.Router();
const { getCases, getCaseById, uploadDocument, upload } = require('../controllers/caseController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.get('/', authenticateToken, authorizeRole(['admin', 'hr']), getCases);
router.get('/:id', authenticateToken, authorizeRole(['admin', 'hr', 'candidate']), getCaseById);
router.post('/:id/documents', authenticateToken, authorizeRole(['admin', 'hr']), upload.single('file'), uploadDocument);

module.exports = router;
