import crypto from 'crypto';

export default class ID{
  private id: Buffer;

  constructor(buf: Buffer | number = 2){
    this.id = Buffer.isBuffer(buf) ? buf : crypto.randomBytes(buf);
  }

  getBuffer(){
    return this.id;
  }

  getSize(){
    return this.id.length;
  }

  toString(encoding?: "hex" | "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | undefined){
    return this.id.toString(encoding);
  }

  xor (id: ID | Buffer) {
    const idBuf = Buffer.isBuffer(id) ? id : id.getBuffer();
    const newId = Buffer.allocUnsafe(Math.max(idBuf.length, this.id.length));
  
    for (var i = 0; i < newId.length; ++i)
      newId[i] = idBuf[i] ^ this.id[i];
  
    return new ID(newId);
  }
}