import { expect } from 'chai';
import Node from '../lib/node';
    
 describe('Node', () => {
  let node;

  beforeEach( () => {
    node = new Node('p');
  });

  it('should exist right now', () => {
    expect(node).to.exist;
  });

  it('should default end to false', () => {
    expect(node.end).to.equal(false)
  });
});