"use strict";

class RingBuffer {
  #length = 0;
  #head = 0;
  #tail = 0;
  #size = 0;
  #control = null;

  constructor(size) {
    this.#size = size;
    const buffer = new ArrayBuffer(size * Int32Array.BYTES_PER_ELEMENT);
    this.#control = new Int32Array(buffer).fill(-1);
  }

  enqueue(value) {
    if (this.#length === this.#size) return false;
    const control = this.#control;
    control[this.#head] = value;
    this.#head = (this.#head + 1) % this.#size;
    this.#length++;
    return true;
  }

  dequeue() {
    if (this.#length === 0) return -1;
    const tail = this.#tail;
    const value = this.#control[tail];
    this.#control[tail] = -1;
    this.#tail = (this.#tail + 1) % this.#size;
    this.#length--;
    return value;
  }
}

module.exports = RingBuffer;