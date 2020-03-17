const axios = require('axios')

const client = axios.create({
    baseURL: 'https://api.ravepay.co/',
    headers:  {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
})

module.exports = client