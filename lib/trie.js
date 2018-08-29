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
    let letters = [...word];

    this.insertRecursion(letters, currentNode);
    this.wordCount++;
  }

  insertRecursion(letters, currentNode) {
    if (!letters.length) {
      currentNode.end = true;
      return;
    }
    let letter = letters.shift();

    if (!currentNode[letter]) {
      currentNode[letter] = new Node();
    } 
    currentNode = currentNode[letter];

    return this.insertRecursion(letters, currentNode);
  }

  suggest(string) {
    if (Object.keys(this.root).includes(string[0])) {
      let letters = [...string];
      let path = letters.reduce( (key, letter) => {
        return key[letter];
      }, this.root)
      console.log('path: ', JSON.stringify(path, null, 4));
      return this.getWords(path, string);
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

  populate(dictionary) {
    dictionary.forEach( word => this.insert(word));
  }
}