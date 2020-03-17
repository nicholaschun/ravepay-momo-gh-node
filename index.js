const GhMomo = require('./services/ghMomo')

const raveRedirectUrl = 'http://127.0.0.1:3000/api/v1/payments/recievepay'
const ravePublicKey = 'FLWPUBK_TEST-352d05d1db792a7723959f5f5fb62fca-X'
const raveSecretKey = 'FLWSECK_TEST-53843f51526db031bc35c98571cd2b4d-X'

const express = require('express')
const app = express()
const port = 3000

const momo = new GhMomo(raveSecretKey, ravePublicKey, raveRedirectUrl)

app.get('/', async (req, res) => {
  const payload = {
    currency: 'GHS',
    payment_type: 'mobilemoneygh',
    country: 'GH',
    amount: '50',
    email: 'user@example.com',
    phonenumber: '0543343891',
    network: 'MTN',
    firstname: 'temi',
    lastname: 'desola',
    voucher: '128373', // only needed for Vodafone users.
    IP: '355426087298442',
    txRef: 'MC-' + Date.now(),
    orderRef: 'MC_' + Date.now(),
    is_mobile_money_gh: 1,
    redirect_url: 'https://rave-webhook.herokuapp.com/receivepayment',
    device_fingerprint: '69e6b7f0b72037aa8428b70fbe03986c'
  }

  try {
    const { data } = await momo.initaiteCharge(payload)
    return res.json(data)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
