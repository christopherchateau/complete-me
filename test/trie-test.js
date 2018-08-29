import { expect } from 'chai';
import Trie from '../lib/trie';
    

describe('TRIE', () => {
  let prefixTrie;

  beforeEach( () => {
    prefixTrie = new Trie;
  });

  it('should exist', () => {
    expect(prefixTrie).to.exist;
  });

  it('should have a default length on zero', () => {
    expect(prefixTrie.wordCount).to.equal(0);
  });

  // it('should have a default root of null', () => {
  //   expect(prefixTrie.root.children).to.deep.equal({});
  // });

  it('should increase word-count when a new word is added', () => {
    expect(prefixTrie.count()).to.equal(0);
    prefixTrie.insert('pizza');
    expect(prefixTrie.count()).to.equal(1);
  });

  // it('should create new branch for each unique first letter', () => {
  //   prefixTrie.insert('apple');
  //   prefixTrie.insert('bat');
  //   prefixTrie.insert('cat');
  //   expect(Object.keys(prefixTrie.root.children)).to.deep.equal(['a', 'b', 'c']);
  // });

  it('should return an array of suggestions', () => {
    prefixTrie.insert('carrot');
    prefixTrie.insert('cars');
    prefixTrie.insert('card');

    let response = prefixTrie.suggest('ca')

    prefixTrie.suggest('car');

    console.log(JSON.stringify(prefixTrie, null, 4));
    expect(response).to.deep.equal(['carrot', 'cars', 'card']);
  });

});
