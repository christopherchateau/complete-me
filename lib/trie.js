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
      insertRecursion(letters, currentNode);
    }
  }

  suggest(string) {
    let currentNode = this.root
    let letters = [...string];

    for (let i = 0; i < letters.length; i++) {
      currentNode = currentNode[letters[i]];
      if (!currentNode) {
        return 'Zero Results';
      }
    }

    let path = letters.reduce( (root, letter) => {
      return root[letter];
    }, this.root);

    return findSuggestions(path, string);

    function findSuggestions(path, string) {
      let suggestions = [];
      let pathKeys = Object.keys(path);

      pathKeys.forEach( key => {
        if (key !== 'end') {
          suggestions.push(...findSuggestions(path[key], string + key));
        } else if (path.end) {
          suggestions.push(string);
        }
      });
    return suggestions;
    }
  }

  populate(dictionary) {
    dictionary.forEach( word => this.insert(word));
  }
}