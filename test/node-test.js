import { expect } from 'chai';

import Node from '../lib/node';
    
 describe('Node', () => {
  let node;

  beforeEach( () => {
    node = new Node('p');
  })

  it('should exist right now', () => {
    expect(node).to.exist;
  })

  it('should default children to be an empty obj', () => {
    expect(node.children).deep.equal({});
  })

  it('should take a letter as an arg and assign it to the letter property', () => {
    expect(node.letter).to.equal('p');
  })

  it('should default end to false', () => {
    expect(node.end).to.equal(false)
  })
});