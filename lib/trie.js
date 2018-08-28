import Node from '../lib/node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = null;
  }
  
  count() {
    return this.wordCount;
  }

  insert(word, thisNode = this.root) {
    this.wordCount++;
  }
}



