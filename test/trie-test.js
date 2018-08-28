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

  it('should have a default root of null', () => {
    expect(prefixTrie.root.children).to.deep.equal({});
  });

  it('should increase word-count when a new word is added', () => {
    expect(prefixTrie.count()).to.equal(0);
    prefixTrie.insert('pizza');
    expect(prefixTrie.count()).to.equal(1);
  });

  it('should create new branch for each unique first letter', () => {
    prefixTrie.insert('pizza');
    prefixTrie.insert('race');
    prefixTrie.insert('racecar');
    prefixTrie.insert('racecars');
    prefixTrie.insert('car');
    prefixTrie.insert('carpet');
    //console.log(JSON.stringify(prefixTrie, null, 4));
    expect(Object.keys(prefixTrie.root.children)).to.deep.equal(['p', 'r', 'c']);

  });

});
