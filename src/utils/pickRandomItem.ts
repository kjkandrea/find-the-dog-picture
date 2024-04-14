export const pickRandomItem = <Item>(
  list: Item[],
  excludeIndexesSet: Set<number> = new Set(),
): Item => {
  return list[0];
};
