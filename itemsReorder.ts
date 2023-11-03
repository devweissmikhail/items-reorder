import { arrayMoveMutable } from 'array-move';


type Item<T> = { id: T; };
type Data<T> = { id?: T; overId?: T; fromIndex?: number; toIndex?: number; };
type ReturnType = 'default' | 'ids';
type Result<I extends { id: unknown }, RT> = RT extends 'ids' ? I['id'][] : I[];


export function itemsReorder<
  T,
  I extends Item<T>,
  RT extends ReturnType = 'default',
>(
  items: I[],
  data: Data<T> | Data<T>[],
  returnType?: RT,
): Result<I, RT> {

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


  const result = returnType === 'ids'
    ? itemIds
    : itemIds.map(itemId => items.find(item => item.id === itemId)!);


  return result as Result<I, RT>;

}
