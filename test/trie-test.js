import { expect } from 'chai';
import Trie from '../lib/trie';
    

describe('TRIE', () => {
  let prefixTrie;

  beforeEach( () => {
    prefixTrie = new Trie;
  });

  it('should exist right now', () => {
    expect(prefixTrie).to.exist;
  })

  it('should have a default length on zero', () => {
    expect(prefixTrie.wordCount).to.equal(0);
  })
  it('should have a default root of null', () => {
    expect(prefixTrie.root).to.equal(null);
  })
  it('should increase word-count when a new word is added', () => {
    expect(prefixTrie.count()).to.equal(0);
    prefixTrie.insert('pizza');
    expect(prefixTrie.count()).to.equal(1);
  })

});
