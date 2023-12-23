const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here
    const fullHash = sha256(key)
    const shortHash = fullHash.slice(0, 8);
    const decimalNumber = parseInt(shortHash, 16); // Parse as base-16 (hex) and convert to decimal
    return decimalNumber;
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    let newKeyValuePair = new KeyValuePair(key,value)
    const index = this.hashMod(key);
    let curr = this.data[index];
    while(curr !== null) {
      curr = curr.next;
      if(curr === newKeyValuePair ){
        throw new Error('hash collision or same key/value pair already exists!')
      }
    }
    if(this.data[index] !== null){
      throw new Error("hash collision or same key/value pair already exists!")
    }
    this.data[index] = newKeyValuePair;
    this.count++;
  }
    
  

  insertWithHashCollisions(key, value) {
    // Your code here
    let newKeyValuePair = new KeyValuePair(key, value);

    const index = this.hashMod(key);

    let curr = this.data[index];

    while (curr !== null) {

      

      if (curr === newKeyValuePair) {

        throw new Error('same key/value pair already exists!')
      }
      curr = curr.next;
    }


    if(this.data[index] !== null){
      //store the value of the current head
     const oldHead = this.data[index];
      // change the value of the current head to the new inserted node
     this.data[index] = newKeyValuePair;
      // change the next of the updated head to the old head
     this.data[index].next = oldHead;
    
     } else{
     // just insert the head if its empty
    this.data[index] =newKeyValuePair;
    
     }
  this.count++;
  }

  insert(key, value) {
    // Your code here
    let newKeyValuePair = new KeyValuePair(key, value);

    const index = this.hashMod(key);

    let curr = this.data[index];
    // handling the case when there exists a keyvalue pair with the samee index 
    while (curr !== null) {



      if (curr.key === key) {

        curr.value = value;
        return;
      }
      curr = curr.next;
    }

    // handling the case when the bucket is not empty (linked)
    if (this.data[index] !== null) {
      //store the value of the current head
      const oldHead = this.data[index];
      // change the value of the current head to the new inserted node
      this.data[index] = newKeyValuePair;
      // change the next of the updated head to the old head
      this.data[index].next = oldHead;

    } else {
      // just insert the head if its empty
      this.data[index] = newKeyValuePair;

    }
    this.count++;
  }
  }




module.exports = HashTable;