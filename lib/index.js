"use strict";

class RingBuffer {
  #length = 0;
  #head = 0;
  #tail = 0;
  #size = 0;
  #control = null;

  constructor(size) {
    this.#size = size;
    this.#control = new Int32Array(
      new ArrayBuffer(size * Int32Array.BYTES_PER_ELEMENT)
    );
  }

  enqueue(value) {
    if (this.#length === this.#size) return false;
    this.#control[this.#head] = value;
    this.#head = (this.#head + 1) % this.#size;
    this.#length++;
    return true;
  }

  dequeue() {
    if (this.#length === 0) return;
    const tail = this.#tail;
    const value = this.#control[tail];
    this.#control[tail] = 0;
    this.#tail = (this.#tail + 1) % this.#size;
    this.#length--;
    return value;
  }

  isEmpty() {
    return this.#length === 0;
  }

  isFull() {
    return this.#length === this.#size;
  }

  get size() {
    return this.#length;
  }
}

module.exports = RingBuffer;