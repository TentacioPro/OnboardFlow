const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const role = req.headers['x-role'] || 'candidate'; // Default to candidate

    if (roles.length && !roles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    req.user = { role };
    next();
  };
};

module.exports = authorize;
