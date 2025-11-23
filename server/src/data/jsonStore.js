// server/utils/jsonStore.js
const fs = require('fs').promises;
const path = require('path');

const STORE_PATH = path.join(__dirname, '../../data/cases.json');

// Initialize if not exists
const initStore = async () => {
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify([]));
  }
};

const getCases = async () => {
    await initStore();
    const data = await fs.readFile(STORE_PATH, 'utf8');
    return JSON.parse(data);
};

const saveCase = async (updatedCase) => {
    const cases = await getCases();
    const index = cases.findIndex(c => c.id === updatedCase.id);
    
    if (index >= 0) {
        cases[index] = updatedCase;
    } else {
        cases.push(updatedCase);
    }
    
    await fs.writeFile(STORE_PATH, JSON.stringify(cases, null, 2));
    return updatedCase;
};

module.exports = { getCases, saveCase };