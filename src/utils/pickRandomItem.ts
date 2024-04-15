import { sample } from "lodash-es";

export const pickRandomItem = <Item>(
  list: Item[],
  excludeIndexesSet: Set<number> = new Set(),
): Item | undefined => {
  if (excludeIndexesSet.size >= list.length) return undefined;

  const remainingItems = list.filter(
    (_, index) => !excludeIndexesSet.has(index),
  );
  return sample(remainingItems);
};
