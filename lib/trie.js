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
    if (!wordArr.length) {
      currentNode.end = true;
      return;
    }
    let letter = wordArr.shift();

    if (!currentNode[letter]) {
      currentNode[letter] = new Node();
    } 
    currentNode = currentNode[letter];

    return this.insertRecursion(wordArr, currentNode);
  }

  suggest(entry = '') {

    if (Object.keys(this.root).includes(entry[0])) {
      let splitentry = [...entry];
      let path = splitentry.reduce( (key, letter) => {

        return key[letter];
      }, this.root)
      return this.getWords(path, entry);
    } else {
      return 'no words';
    }
  }

  getWords(obj, entry) {
    let results = [];
    let arr = Object.keys(obj);

    arr.forEach( key => {
      if (key !== 'end') {
        results.push(...this.getWords(obj[key], entry + key));
      } else if (obj.end) {
        results.push(entry);
      }
    })
  return results;
  }
}