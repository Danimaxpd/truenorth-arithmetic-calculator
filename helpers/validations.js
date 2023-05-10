const bcrypt = require("bcrypt")

function validateUserRequest(body) {
    const requiredProperties = ['username', 'password'];

    for (const property of requiredProperties) {
        if (!body[property]) {
            return false;
        }
    }

    return true;
}


module.exports = {
    validateUserRequest
};