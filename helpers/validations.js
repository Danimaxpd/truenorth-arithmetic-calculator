function validateUserRequest(body) {
    const requiredProperties = ['username', 'password'];

    for (const property of requiredProperties) {
        if (!body[property]) {
            return false;
        }
    }

    return true;
}

function validateRecordRequest(body) {
    const requiredProperties = ['amount', 'user_balance', "operation_response", "userId", "operationType"];

    for (const property of requiredProperties) {
        if (!body[property]) {
            return false;
        }
    }

    return true;
}


module.exports = {
    validateUserRequest,
    validateRecordRequest
};