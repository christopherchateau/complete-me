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

    if (!rootLetters.includes(letters[0])) {
      return 'Zero Results';
    }

    let path = letters.reduce( (root, letter) => {
      return root[letter];
    }, this.root);

    return getWords(path, string);

    function getWords(path, string) {
      let results = [];
      let pathKeys = Object.keys(path);

      pathKeys.forEach( key => {
        if (key !== 'end') {
          results.push(...getWords(path[key], string + key));
        } else if (path.end) {
          results.push(string);
        }
      });
    return results;
    }
  }

  populate(dictionary) {
    dictionary.forEach( word => this.insert(word));
  }
}