const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
    const hiddenKey = process.env.KEY;
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        cnp: user.cnp
    },
    hiddenKey);

    return token;
};

module.exports = genAuthToken;