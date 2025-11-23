const { cases } = require('../data/mockData');

const getCases = (req, res) => {
  res.json(cases);
};

const getCaseById = (req, res) => {
  const caseItem = cases.find(c => c.id === req.params.id);
  if (!caseItem) {
    return res.status(404).json({ message: 'Case not found' });
  }
  res.json(caseItem);
};

module.exports = { getCases, getCaseById };
