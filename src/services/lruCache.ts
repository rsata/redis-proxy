class LNode {
  key: any;
  value: any;
  next: any;
  prev: any;
  lastUpdate: number;

  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
    this.lastUpdate = new Date().getTime();
  }
}

export default class LRU {
  head: any;
  tail: any;
  length: number; 
  limit: number;
  ttl: number;
  map: any;

  constructor(ttl: number, limit: number) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.limit = limit;
    this.ttl = ttl;
    this.map = {};
  }

  get(key: any) {  
    if(this.map[key]) {
      const expired = this.checkTtl(key);
      if (expired === true) {
        this.delete(key);
        return undefined;
      } else {
        const value = this.map[key].value;
        // remove from list
        this.delete(key);
        // write to head of list
        this.set(key, value);      
        return value;
      }      
    }
    return undefined;
  }

  set(key: any, value: any) { 
    let node = new LNode(key, value)
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      // first, update the old head 
      this.head.prev = node;
      node.next = this.head;
      // then update the head
      this.head = node;      
    }
    this.map[node.key] = node
    this.length++;
    this.enforceMax();
  }

  delete(key: any) {
    let node = this.map[key];
    if (this.head === node && this.tail === node) {
      this.head = null;
      this.tail = null;
      delete this.map[key];
      this.length--;
      return;      
    }
    //update the prev/next nodes to point to each other
    if (node.prev === null) {
      // if at the beginning of the list, set next to last as tail
      node.next.prev = null;
      this.head = node.next;
      delete this.map[key];
      this.length--;
      return;
    }
    if (node.next === null) {
      // if at the end of the list, set next to last as tail
      node.prev.next = null;
      this.tail = node.prev;
      delete this.map[key];
      this.length--;
      return;
    }    
    // update previous and next nodes
    node.prev.next = node.next
    node.next.prev = node.prev
    delete this.map[key]
    this.length--
  }

  checkTtl(key: any) {
    const lastUpdate = this.map[key].lastUpdate
    const now = new Date().getTime();
    // if item has expired, delete it
    if (now - lastUpdate > this.ttl) {
      return true;
    } 
    return false;   
  }

  enforceMax() {
    if (this.length > this.limit) {
      this.delete(this.tail.key)
    }    
  }
}


// const cache = new LRU(1000, 3)

// cache.set(1, "first")
// cache.set(2, "second")
// cache.set(3, "third")
// console.log(cache)
