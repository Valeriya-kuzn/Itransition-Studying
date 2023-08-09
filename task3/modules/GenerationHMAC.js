const crypto = require('crypto');

class GenerationHMAC {

    constructor(pcMove) {
        this.message = pcMove;
        this.secretKey;
    }

    generateKey() {
        this.secretKey = crypto.randomBytes(32).toString('hex');
        return this.secretKey;
    }

    generateHMAC() {
        const hmac = crypto.createHmac('sha3-256', this.secretKey);
        hmac.update(this.message);
        const hmacResult = hmac.digest().toString('hex');
        return hmacResult;
    }
}

module.exports = GenerationHMAC;