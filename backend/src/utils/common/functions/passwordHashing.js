const bcrypt = require('bcryptjs');

// Hash a password
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

// Compare a password
exports.comparePassword = async (enteredPassword, dbPassword) => {
    const compareResult = await bcrypt.compare(enteredPassword, dbPassword);
    return compareResult;
};
