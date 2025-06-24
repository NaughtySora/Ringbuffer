export class RingBuffer {
  constructor(size: number);
  enqueue(value: number): boolean;
  dequeue(): number;
}