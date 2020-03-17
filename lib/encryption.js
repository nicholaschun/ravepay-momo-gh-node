/* Encrypts the payload before sending to api */

const forge = require ("node-forge");
const  md5  = require ('md5')

class Encryption {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  encryptdata(payload) {
    let cipher = forge.cipher.createCipher(
      "3DES-ECB",
      forge.util.createBuffer(this.getKey())
    );
    cipher.start({ iv: "" });
    cipher.update(forge.util.createBuffer(payload, "utf-8"));
    cipher.finish();
    let encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  }

  getKey() {
    let keymd5 = md5(this.secretKey)
    let keymd5last12 = keymd5.substr(-12)

    let seckeyadjusted = this.secretKey.replace('FLWSECK-', '')
    let seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12)

    return seckeyadjustedfirst12 + keymd5last12
  }
}

module.exports = Encryption
