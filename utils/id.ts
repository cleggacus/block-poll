import crypto from 'crypto';

export default class ID{
  private id: string;
  private size: number;

  constructor(id: string | number = 2){
    if(typeof id == 'string'){
      this.id = (id.length % 2) ? ('0' + id) : id;
      this.size = this.id.length;
    }else{
      this.size = id;
      this.id = crypto.randomBytes(id).toString('hex');
    }
  }

  getSize(){
    return this.size;
  }

  toString(encoding?: 'hex' | 'bin' | 'dec' | undefined){
    if(encoding == 'dec')
      return parseInt(this.id, 16).toString();
    if(encoding == 'bin')
      return parseInt(this.id, 16).toString(2);
    return this.id;
  }

  lt(id: ID | string){
    if(typeof id == 'string')
      id = new ID(id);

    return parseInt(this.toString('dec')) < parseInt(id.toString('dec'))
  }

  xor (id: ID | string) {
    let other = typeof id == 'string' ? parseInt(id, 16).toString(2) : id.toString('bin');
    let me = this.toString('bin');

    while (other.length < me.length)
      other = '0' + other;
    while (other.length > me.length)
      me = '0' + me;
      
    let newId = '';
  
    for (var i = 0; i < me.length; ++i)
      newId += parseInt(me[i]) ^ parseInt(other[i]);
  
    return new ID(parseInt(newId, 2).toString(16));
  }
}