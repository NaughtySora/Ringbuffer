export class RingBuffer {
  constructor(size: number);
  enqueue(value: number): boolean;
  dequeue(): number;
  isFull(): boolean;
  isEmpty(): boolean;
  size: number;
}