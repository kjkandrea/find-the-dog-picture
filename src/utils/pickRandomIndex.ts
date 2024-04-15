import { sample } from "lodash-es";

export const pickRandomIndex = (
  length: number,
  excludeIndexesSet: Set<number> = new Set(),
): number => {
  if (excludeIndexesSet.size >= length) return -1;

  return (
    sample(
      Array.from({ length }, (_, i) => i).filter(
        (_, index) => !excludeIndexesSet.has(index),
      ),
    ) ?? -1
  );
};
