import { expect } from 'chai';
import Trie from '../lib/trie';
import fs from 'fs';
require('locus');

describe('TRIE', () => {
  let prefixTrie;
  const text = "/usr/share/dict/words";
  const dictionary = fs.readFileSync(text).toString().trim().split('\n');


  beforeEach( () => {
    prefixTrie = new Trie;
  });

  it('should exist', () => {
    expect(prefixTrie).to.exist;
  });

  it('should have a default length on zero', () => {
    expect(prefixTrie.wordCount).to.equal(0);
  });

  it('should increase word-count when a new word is added', () => {
    expect(prefixTrie.count()).to.equal(0);
    prefixTrie.insert('pizza');
    expect(prefixTrie.count()).to.equal(1);
  });

  it('should create new branch for each unique first letter', () => {
    prefixTrie.insert('apple');
    prefixTrie.insert('bat');
    prefixTrie.insert('cat');
    expect(Object.keys(prefixTrie.root)).to.deep.equal(['a', 'b', 'c']);
  });

  it('should return an array of suggestions', () => {
    prefixTrie.insert('carrot');
    prefixTrie.insert('cars');
    prefixTrie.insert('card');

    let response = prefixTrie.suggest('ca');
    //console.log(JSON.stringify(prefixTrie, null, 4));
    expect(response).to.deep.equal(['carrot', 'cars', 'card']);
  });

  it.skip('should populate with dictionary', () => {
    prefixTrie.populate(dictionary);
    expect(prefixTrie.count()).to.equal(235886);
  });

});
