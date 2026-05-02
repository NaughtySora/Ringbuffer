export class RingBuffer {
  constructor(size: number);
  enqueue(value: any): boolean;
  dequeue(): any;
  isEmpty: number;
  isFull: number;
  size: number;
  length: number;
}