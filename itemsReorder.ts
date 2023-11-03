import { arrayMoveMutable } from 'array-move';


type Item<T> = { id: T; };
type Data<T> = { id?: T; overId?: T; fromIndex?: number; toIndex?: number; };
type ResultFormat = 'default' | 'ids';
type Result<T, I, R> = R extends 'ids' ? T[] : I[];


export function itemsReorder<
  T,
  I extends Item<T>,
  R extends ResultFormat = 'default',
>(
  items: I[],
  data: Data<T> | Data<T>[],
  resultFormat?: R,
): Result<T, I, R> {

  const itemIds = items.map(item => item.id);
  const dataB = Array.isArray(data) ? data : [data];

  dataB.forEach(d => {

    const oldIndex = d.id !== undefined ? itemIds.indexOf(d.id) : d.fromIndex;
    const newIndex = d.overId !== undefined ? itemIds.indexOf(d.overId) : d.toIndex;

    if (
      (oldIndex === undefined || (d.id !== undefined && oldIndex === -1)) ||
      (newIndex === undefined || (d.overId !== undefined && newIndex === -1))
    ) return;

    arrayMoveMutable(itemIds, oldIndex, newIndex);

  });


  const result = resultFormat === 'ids'
    ? itemIds
    : itemIds.map(itemId => items.find(item => item.id === itemId)!);


  return result as Result<T, I, R>;

}
