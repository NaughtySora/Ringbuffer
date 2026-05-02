"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require('node:test');
const { RingBuffer } = require("../main");

describe("RingBuffer", () => {
  it('reminder', () => {
    const buffer = new RingBuffer(3);
    assert.equal(buffer.length, 0);
    assert.equal(buffer.size, 3);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assert.equal(buffer.length, 2);
    buffer.enqueue(3);
    assert.equal(buffer.enqueue(4), false);
    assert.ok(buffer.isFull);
    assert.equal(buffer.dequeue(), 1);
    assert.equal(buffer.enqueue(4), true);
    assert.equal(buffer.dequeue(), 2);
    assert.equal(buffer.dequeue(), 3);
    assert.equal(buffer.dequeue(), 4);
    assert.equal(buffer.length, 0);
    assert.ok(buffer.isEmpty);
    assert.equal(buffer.dequeue(), undefined);
  });

  it('bitwise', () => {
    const buffer = new RingBuffer(8);
    assert.equal(buffer.length, 0);
    buffer.enqueue(1);
    buffer.enqueue(2);
    assert.equal(buffer.length, 2);
    assert.equal(buffer.size, 8);
    buffer.enqueue(3);
    buffer.enqueue(4);
    buffer.enqueue(5);
    buffer.enqueue(6);
    buffer.enqueue(7);
    buffer.enqueue(8);
    assert.equal(buffer.enqueue(9), false);
    assert.equal(buffer.dequeue(), 1);
    assert.equal(buffer.enqueue(9), true);
    assert.equal(buffer.dequeue(), 2);
    assert.equal(buffer.dequeue(), 3);
    assert.equal(buffer.dequeue(), 4);
    assert.equal(buffer.dequeue(), 5);
    assert.equal(buffer.dequeue(), 6);
    assert.equal(buffer.dequeue(), 7);
    assert.equal(buffer.dequeue(), 8);
    assert.equal(buffer.dequeue(), 9);
    assert.equal(buffer.length, 0);
    assert.equal(buffer.dequeue(), undefined);
  });
});
