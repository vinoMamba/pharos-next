import UTF8 from 'crypto-js/enc-utf8';
import {encrypt, decrypt} from 'crypto-js/aes';

export class AESEncryption {
  private key: any;

  constructor(key: string) {
    this.key = key
  }
  encryptByAES(data: string) {
    return encrypt(data, this.key).toString();
  }
  decryptByAES(data: string) {
    return decrypt(data, this.key).toString(UTF8);
  }
}
