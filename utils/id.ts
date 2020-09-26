import crypto from 'crypto';

class ID{
  private id: string;
  private size: number;

  constructor(size: number, id: string = ''){
    this.size = Math.round(size);

    if(id.length > size*2)
      id = '';

    this.id = id ? id : crypto.randomBytes(this.size).toString('hex');

    while(this.id.length < size*2)
      this.id = `0${this.id}`;
  }

  getSize(){
    return this.size;
  }

  toHex(){
    return this.id;
  }

  toBin(){
    let bin = parseInt(this.id, 16).toString(2);
  
    while(bin.length < this.size*8)
      bin = `0${bin}`;
  
    return bin;
  }

  xor(id: ID){
    let bin1 = this.toBin();
    let bin2 = id.toBin();

    let bin = '';
    
    for(let i = 0; i < bin1.length; i ++){
      bin += (parseInt(bin1[i]) ^ parseInt(bin2[i])).toString();
    }
    
    return new ID(this.size, parseInt(bin, 2).toString(16));
  }

  gt(id: ID){
    return parseInt(this.id, 16) > parseInt(id.toHex(), 16);
  }

  lt(id: ID){
    return parseInt(this.id, 16) < parseInt(id.toHex(), 16);
  }

  gte(id: ID){
    return parseInt(this.id, 16) >= parseInt(id.toHex(), 16);
  }

  lte(id: ID){
    return parseInt(this.id, 16) <= parseInt(id.toHex(), 16);
  }
}

export default ID;