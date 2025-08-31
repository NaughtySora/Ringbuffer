"use strict";

const assert = require("node:assert");
const { describe, it } = require('node:test');
const RingBuffer = require("../lib/index.js");

describe('RingBuffer', () => {
  it('enqueue and dequeue basic operations', () => {
    const buf = new RingBuffer(4);

    assert.strictEqual(buf.size, 0);
    assert.strictEqual(buf.isEmpty(), true);
    assert.strictEqual(buf.isFull(), false);

    buf.enqueue(10);
    buf.enqueue(20);
    buf.enqueue(30);

    assert.strictEqual(buf.size, 3);
    assert.strictEqual(buf.isEmpty(), false);

    assert.strictEqual(buf.dequeue(), 10);
    assert.strictEqual(buf.dequeue(), 20);
    assert.strictEqual(buf.size, 1);

    buf.enqueue(40);
    buf.enqueue(50);
    buf.enqueue(60);

    assert.strictEqual(buf.isFull(), true);
    assert.strictEqual(buf.size, 4);

    assert.strictEqual(buf.dequeue(), 30);
    assert.strictEqual(buf.dequeue(), 40);
    assert.strictEqual(buf.dequeue(), 50);
    assert.strictEqual(buf.dequeue(), 60);
    assert.strictEqual(buf.isEmpty(), true);
  });

  it('wraps around correctly', () => {
    const buf = new RingBuffer(3);
    buf.enqueue(1);
    buf.enqueue(2);
    buf.enqueue(3);

    assert.strictEqual(buf.isFull(), true);
    assert.strictEqual(buf.dequeue(), 1);
    assert.strictEqual(buf.dequeue(), 2);

    buf.enqueue(4);
    buf.enqueue(5);

    assert.strictEqual(buf.dequeue(), 3);
    assert.strictEqual(buf.dequeue(), 4);
    assert.strictEqual(buf.dequeue(), 5);
    assert.strictEqual(buf.isEmpty(), true);
  });

  it('returns undefined when dequeue empty', () => {
    const buf = new RingBuffer(2);
    assert.strictEqual(buf.dequeue(), undefined);
  });

  it('returns false with enqueue when full, true otherwise', () => {
    const buf = new RingBuffer(2);
    assert.ok(buf.enqueue(1));
    assert.ok(buf.enqueue(2));
    assert.ok(!buf.enqueue(3));
    buf.dequeue();
    assert.ok(buf.enqueue(4));
  });

  it('single element repeatedly', () => {
    const buf = new RingBuffer(1);
    buf.enqueue(42);
    assert.strictEqual(buf.dequeue(), 42);
    assert.strictEqual(buf.isEmpty(), true);
    buf.enqueue(99);
    assert.strictEqual(buf.dequeue(), 99);
    assert.strictEqual(buf.isEmpty(), true);
  });
});