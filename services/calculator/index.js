const axios = require('axios');
require('dotenv').config();
const { classException } = require("../../helpers/throw_functions");

class Calculator {
  static add(a, b) {
    try {
      return a + b;
    } catch (error) {
      return 0;
    }
  }

  static subtract(a, b) {
    try {
      return a - b;
    } catch (error) {
      return 0;
    }
  }

  static multiply(a, b) {
    try {
      return a * b;
    } catch (error) {
      return 0;
    }
  }

  static divide(a, b) {
    try {
      return a / b;
    } catch (error) {
      return 0;
    }
  }

  static squareRoot(a) {
    try {
      return Math.sqrt(a);
    } catch (error) {
      return 0;
    }
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
      if (response.status === 200) {
        const data = response.data;
        return data.result.random.data
      }
    } catch (error) {
      if (error.code && error.message) {
        throw error;
      }
      throw classException(res.errors, response.status);
    }
  }
}

module.exports = Calculator;
