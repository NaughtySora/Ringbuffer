
# Ring Buffer

## Types

`class RingBuffer {`\
  `constructor(size: number);`\
  `enqueue(value: number): boolean;`\
  `dequeue(): number;`\
`}`

## Example

```js
const buffer = new RingBuffer(4);

buffer.enqueue(1);
buffer.enqueue(2);

const one = buffer.dequeue();
const two = buffer.dequeue();
```