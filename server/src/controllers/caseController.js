const axios = require('axios');
const multer = require('multer');
const { getCases, saveCase } = require('../data/jsonStore');

// Python Service URL (Ensure your Python server is running on port 8000)
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

// Keep Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// 1. GET All Cases
const getAllCases = async (req, res) => {
  try {
    const cases = await getCases();
    res.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ message: 'Failed to fetch cases' });
  }
};

// 2. GET Case by ID
const getCaseById = async (req, res) => {
  try {
    const cases = await getCases();
    const caseItem = cases.find(c => c.id === req.params.id);
    
    if (!caseItem) return res.status(404).json({ message: 'Case not found' });
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case' });
  }
};

// 3. POST Upload & Analyze (The Core AI Bridge)
const uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    console.log(`Analyzing ${file.originalname} for Case ${id}...`);

    // A. Call Python Microservice
    // We send base64 because JSON handles it easier than multipart for S2S calls
    let analysisResult;
    try {
        const fileBase64 = file.buffer.toString('base64');
        const pythonRes = await axios.post(`${PYTHON_SERVICE_URL}/pipeline/onboarding-analyze`, {
            case_id: id,
            document_text: fileBase64,
            filename: file.originalname
        });
        analysisResult = pythonRes.data.data; // The structured JSON from Python
    } catch (err) {
        console.error("Python Service Error:", err.message);
        return res.status(503).json({ message: "AI Service unavailable" });
    }

    // B. Save Result to JSON Store
    const cases = await getCases();
    const currentCase = cases.find(c => c.id === id);

    if (currentCase) {
        // Create new document entry
        const newDoc = {
            id: `doc-${Date.now()}`,
            name: file.originalname,
            size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
            uploadedAt: new Date().toISOString(),
            type: file.mimetype,
            // Store the analysis DIRECTLY on the document
            analysis: analysisResult
        };

        if (!currentCase.documents) currentCase.documents = [];
        currentCase.documents.push(newDoc);
        
        // Also update high-level case info if needed
        if (analysisResult.extracted) {
             // Example: Update summary if it's the main contract
             currentCase.summary = mapExtractedToSummary(analysisResult.extracted);
        }

        await saveCase(currentCase);

        res.json({
            message: 'Analysis complete',
            document: newDoc,
            analysis: analysisResult
        });
    } else {
        res.status(404).json({ message: 'Case not found' });
    }

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Processing failed' });
  }
};

// Helper to map Python dict to your UI's Summary format
const mapExtractedToSummary = (extracted) => {
    return Object.entries(extracted).map(([key, value], index) => ({
        id: `sum-${index}`,
        field: key.replace(/_/g, ' ').toUpperCase(),
        value: value,
        status: 'pending'
    }));
};

module.exports = { getCases: getAllCases, getCaseById, uploadDocument, upload };