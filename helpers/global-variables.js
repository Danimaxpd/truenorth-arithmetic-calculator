'use strict'


require('dotenv').config();
const moment = require('moment')

const currentDate = moment().utc().format('YYYY-MM-DD')
const stringSecret = `${process.env.APP_JWT_SECRET}-${currentDate}`
const encodedJWT = Buffer.from(stringSecret).toString('base64')
const validPassId = `${process.env.APP_VALID_PASS_ID}-${currentDate}`
const expiresIn = process.env.APP_JWT_EXPIRES_IN || "1h";

module.exports = {
    currentDate,
    stringSecret,
    encodedJWT,
    validPassId,
    expiresIn
};