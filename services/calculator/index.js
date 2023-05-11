const axios = require('axios');
require('dotenv').config();
const { classException } = require("../../helpers/throw_functions");

class Calculator {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    return a / b;
  }

  static squareRoot(a) {
    return Math.sqrt(a);
  }

  static async randomString(length) {
    try {
      const apiKey = process.env.API_RANDOMORG_KEY;
      const apiUrl = process.env.API_RANDOMORG_URL;
      if (!apiKey || !apiUrl) {
        throw classException('Apikey or apiUrl for RANDOMORG is not defined', 500);
      }
      const bodyData = {
        "jsonrpc": "2.0",
        "method": "generateStrings",
        "params": {
          "apiKey": apiKey,
          "n": 1,
          "length": length,
          "characters": "abcdefghijklmnopqrstuvwxyz",
          "replacement": true
        },
        "id": 1
      }
      const options = {
        method: 'POST',
        url: apiUrl,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        data: bodyData
      };

      const response = await axios.request(options);

      if (response.status === 201) {
        const data = response.data;
        return data.result.random.data
      }
    } catch (error) {
      throw classException(res.errors, response.status);
    }
  }
}

module.exports = Calculator;
