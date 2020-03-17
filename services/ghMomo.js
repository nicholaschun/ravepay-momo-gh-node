const Encryption = require('./../lib/encryption')
const ApiCall = require('./../lib/api')

class GhMomo {
  constructor(secretKey, publicKey, redirectUrl) {
    this.secretKey = secretKey, 
    this.publicKey = publicKey
    this.redirectUrl = redirectUrl

  }

  charge(payload) {
    payload.PBFPubKey = this.publicKey
    payload.redirect_url = this.redirectUrl
    let encryptInstance = new Encryption(this.secretKey)
    let encryptedData = encryptInstance.encryptdata(JSON.stringify(payload))

    let api = new ApiCall(this.publicKey)
    return new Promise((resolve, reject) => {
      api
        .initiateCharge(encryptedData)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  }
}

module.exports = GhMomo
