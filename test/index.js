"use strict";

const assert = require("node:assert");
const RingBuffer = require("../lib/index.js");

const buffer = new RingBuffer(4);

assert.strictEqual(buffer.enqueue(1), true);
assert.strictEqual(buffer.enqueue(2), true);
assert.strictEqual(buffer.enqueue(3), true);
assert.strictEqual(buffer.enqueue(4), true);
assert.strictEqual(buffer.enqueue(5), false);
assert.strictEqual(buffer.enqueue(6), false);
assert.strictEqual(buffer.enqueue(7), false);
assert.strictEqual(buffer.enqueue(8), false);

assert.strictEqual(buffer.dequeue(), 1);
assert.strictEqual(buffer.dequeue(), 2);
assert.strictEqual(buffer.dequeue(), 3);
assert.strictEqual(buffer.dequeue(), 4);

assert.strictEqual(buffer.enqueue(69), true);
assert.strictEqual(buffer.dequeue(), 69);
assert.strictEqual(buffer.enqueue(42), true);
assert.strictEqual(buffer.dequeue(), 42);
assert.strictEqual(buffer.dequeue(), -1);

assert.strictEqual(buffer.enqueue(12), true);
assert.strictEqual(buffer.enqueue(13), true);
assert.strictEqual(buffer.enqueue(37), true);
assert.strictEqual(buffer.dequeue(), 12);
