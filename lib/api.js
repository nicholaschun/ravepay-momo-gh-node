const client = require('../utils/client')

class ApiCall {
  constructor(publicKey) {
    this.publicKey = publicKey
  }

  initiateCharge(encryptedPayload) {
    return new Promise((resolve, reject) => {
      client({
        url: '/flwv3-pug/getpaidx/api/charge',
        method: 'post',
        data: {
          PBFPubKey: this.publicKey,
          client: encryptedPayload,
          alg: '3DES-24'
        }
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }

  verifyPay(txref, secretKey){
    return new Promise((resolve, reject) => {
      client({
        url: '/flwv3-pug/getpaidx/api/v2/verify',
        method: 'post',
        data:{
          txref: txref,
          SECKEY: secretKey
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error.response.data)
      })
    })
  }
}

module.exports = ApiCall
