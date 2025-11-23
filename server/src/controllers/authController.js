const jwt = require('jsonwebtoken');
require('dotenv').config();

const USERS = [
    { id: 1, email: 'admin@company.com', password: 'password', role: 'admin', name: 'Admin User' },
    { id: 2, email: 'user@company.com', password: 'password', role: 'user', name: 'Standard User' }
];

const login = (req, res) => {
    const { email, password } = req.body;
    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
};

const register = (req, res) => {
    // Mock registration
    res.status(501).json({ message: 'Registration not implemented for MVP' });
};

module.exports = { login, register };
