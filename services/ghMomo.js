const Encryption = require('./../lib/encryption')
const ApiCall = require('./../lib/api')

class GhMomo {
  constructor(secretKey, publicKey, redirectUrl) {
    ;(this.secretKey = secretKey), (this.publicKey = publicKey)
    this.redirectUrl = redirectUrl
    this.api = new ApiCall(publicKey)
  }

  charge(payload) {
    payload.PBFPubKey = this.publicKey
    payload.redirect_url = this.redirectUrl
    let encryptInstance = new Encryption(this.secretKey)
    let encryptedData = encryptInstance.encryptdata(JSON.stringify(payload))

    return new Promise((resolve, reject) => {
      this.api
        .initiateCharge(encryptedData)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  verifyPayment(txRef) {
    return new Promise((resolve, reject) => {
      this.api
        .verifyPay(txRef, this.secretKey)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

module.exports = GhMomo
