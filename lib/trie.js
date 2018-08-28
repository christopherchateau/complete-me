import Node from '../lib/node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let currentNode = this.root;
    let wordArr = [...word];
    this.insertRecursion(wordArr, currentNode);
    this.wordCount++;
  }

  insertRecursion(wordArr, currentNode) {
    if (wordArr.length < 1) {
      currentNode.end = true;
      return;
    };

    if (currentNode.children[wordArr[0]]) {
      currentNode = currentNode.children[wordArr.shift()];
    } else {
      let letter = wordArr[0];

      currentNode.children[letter] = new Node();
      currentNode = currentNode.children[letter];
      wordArr.shift();
    }

    return this.insertRecursion(wordArr, currentNode);
  }
  
}



