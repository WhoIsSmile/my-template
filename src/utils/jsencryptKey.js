import Vue from 'vue'
import JsEncrypt from 'jsencrypt'

Vue.prototype.$encruption = function (obj) {
    let encrypt = new JsEncrypt();
    encrypt.setPublicKey(
        '-----BEGIN PUBLIC KEY-----' +
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDW0Rsnv18FNA8uQ/ntaaBmO+fT' +
        '2NiTQW+gPpY4c0oZ4sxWaUdGpM8oLDqTq1jEpp50veqOXR2l9RS5B5g3nWrDJ6z4' +
        'j1hZ9WBb6lzde9PCmL3h0NZLfqUr4YS9QXoPaQf6BNUgttRwWw3tA97kqQAjUS8I' +
        'HbHT9YJocdkFgeSZiwIDAQAB' +
        '-----END PUBLIC KEY-----'
    )
    return encrypt.encrypt(obj);
}