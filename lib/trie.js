import Node from '../lib/node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = {};
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let currentNode = this.root;
    let letters = [...word];

    insertRecursion(letters, currentNode);
    this.wordCount++;

    function insertRecursion(letters, currentNode) {
      if (!letters.length) {
        currentNode.end = true;
        return;
      }
      let letter = letters.shift();

      if (!currentNode[letter]) {
        currentNode[letter] = new Node();
      } 
      currentNode = currentNode[letter];

      return insertRecursion(letters, currentNode);
    }
  }

  suggest(string) {
    if (Object.keys(this.root).includes(string[0])) {
      let letters = [...string];
      let path = letters.reduce( (key, letter) => {
        return key[letter];
        //string = 'he'
        //copy of path.root.h.e

      }, this.root);
      console.log(path, string)
      return this.getWords(path, string);
    } else {
      return 'no words';
    }
  }
      //console.log('path: ', JSON.stringify(path, null, 4));

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

var obj = {"p": {"end": false,"i": {"end": false,"z": {"end": false,"z": {"end": false,"a": {"end":true}}}}}}
//console.log(Object.keys(obj))