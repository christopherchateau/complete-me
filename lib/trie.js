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
    let rootLetters = Object.keys(this.root);
    let letters = [...string];

    // console.log(Object.keys(this.root))
    if (rootLetters.includes(letters[0])) {
      let path = letters.reduce( (key, letter) => {
        return key[letter];
      }, this.root);

      // console.log('path: ', JSON.stringify(path, null, 4));
      return getWords(path, string);
    } else {
      return 'Zero Results';
    }

    function getWords(obj, entry) {
      let results = [];
      let arr = Object.keys(obj);

      arr.forEach( key => {
        if (key !== 'end') {
          results.push(...getWords(obj[key], entry + key));
        } else if (obj.end) {
          results.push(entry);
        }
      })
    return results;
    }
  }

  populate(dictionary) {
    dictionary.forEach( word => this.insert(word));
  }
}

var obj = {"p": {"end": false,"i": {"end": false,"z": {"end": false,"z": {"end": false,"a": {"end":true}}}}}}
//console.log(Object.keys(obj))