import { pickRandomItem } from "./pickRandomItem";

describe("pickRandomItem", () => {
  it("제외 인덱스 세트를 제외한 무작위의 아이템을 리턴한다.", () => {
    const array = [1, 2, 3, 4, 5];
    const excludeIndexes = [0, 1, 2];
    const excludeIndexesSet = new Set(excludeIndexes);

    for (let i = 0; i < 100; i++) {
      const result = pickRandomItem(array, excludeIndexesSet);
      expect(result !== undefined && array.includes(result)).toBe(true);
      expect(
        result === undefined || excludeIndexes.includes(array.indexOf(result)),
      ).toBe(false);
    }
  });
});
