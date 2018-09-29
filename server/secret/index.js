const crypto = require('crypto');
// 암호화 및 복호화
module.exports = {
    salting: (data) => {
        const buf = crypto.randomBytes(64);
        const salt = buf.toString('base64');
        const digest = crypto.pbkdf2Sync(data, salt, 100000, 64, 'sha512');
        return salt + digest.toString('base64');
    },

    hashing: (data) => {
        return crypto.createHash('sha512').update(data).digest('base64');
    },

    checkHashword: (hashword, data) => {
        const salt = hashword.slice(0, 88);
        const temp = crypto.pbkdf2Sync(data, salt, 100000, 64, 'sha512');
        const tempDigest = temp.toString('base64');
        const tempHashword = salt + tempDigest;
        return hashword === tempHashword;
    },

    encrypt: (data, key) => {
        const cipher = crypto.createCipher('aes192', key);
        cipher.update(data, 'utf8', 'base64');
        return cipher.final('base64');
    },

    decrypt: (data, key) => {
        const decipher = crypto.createDecipher('aes192', key);
        decipher.update(data, 'base64', 'utf8');
        return decipher.final('utf8');
    },
};