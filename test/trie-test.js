import { expect } from 'chai';
import Trie from '../lib/trie';
import fs from 'fs';
require('locus');

describe('Trie', () => {
  let prefixTrie;
  const text = "/usr/share/dict/words";
  const dictionary = fs.readFileSync(text).toString().trim().split('\n');

  beforeEach( () => {
    prefixTrie = new Trie;
  });

  it('should exist', () => {
    expect(prefixTrie).to.exist;
  });

  it('should have a default length of zero', () => {
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
    prefixTrie.insert('card');
    prefixTrie.insert('cards');
    prefixTrie.insert('carry');

    let response = prefixTrie.suggest('car');
    expect(response).to.deep.equal(['carrot', 'carry', 'card', 'cards']);
  });

 it('should return \'zero results\' when no suggestions are found', () => {
    prefixTrie.insert('apple');
    prefixTrie.insert('bat');
    prefixTrie.insert('cat');

    let response = prefixTrie.suggest('dog');
    let response2 = prefixTrie.suggest('appple');

    expect(response).to.deep.equal('Zero Results');
    expect(response2).to.deep.equal('Zero Results');
  });

  it('should populate with dictionary', () => {
    prefixTrie.populate(dictionary);
    expect(prefixTrie.count()).to.equal(235886);
  });
});
