# itemsReorder
Array reorder items

### Peer dependencies
```shell
npm install array-move
```

### Examples

```typescript
const items = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
];

const result = itemsReorder(items, { id: 1, overId: 0 });
console.log(result);
// [{ id: 1 }, { id: 0 }, { id: 2 }]

const resultB = itemsReorder(items, { id: 1, overId: 0 }, 'ids');
console.log(resultB);
// [1, 0, 2]

const resultC = itemsReorder(items, { fromIndex: 0, toIndex: -1 });
console.log(resultC);
// [{ id: 1 }, { id: 2 }, { id: 0 }]


// Allowed variations

itemsReorder(items, [{ fromIndex: -1, toIndex: 0 }, { id: 0, overId: 1 }, ...more]);
itemsReorder(items, [{ fromIndex: -2, overId: 0 }, { id: 0, toIndex: 1 }, ...more]);
```
