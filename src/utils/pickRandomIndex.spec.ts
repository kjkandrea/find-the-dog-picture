import { pickRandomIndex } from "./pickRandomIndex";

describe("pickRandomIndex", () => {
  it("제외 인덱스 세트를 제외한 무작위의 인덱스 리턴한다.", () => {
    const length = 5;
    const remainingIndexes = [3, 4];
    const excludeIndexes = [0, 1, 2];
    const excludeIndexesSet = new Set(excludeIndexes);

    for (let i = 0; i < 100; i++) {
      const result = pickRandomIndex(length, excludeIndexesSet);
      expect(remainingIndexes.includes(result)).toBe(true);
      expect(excludeIndexes.includes(result)).toBe(false);
    }
  });

  it("제외 인덱스 세트가 모든 인덱스를 포함하면 결과는 -1 이다.", () => {
    const excludeIndexesSet = new Set([0]);

    expect(pickRandomIndex(1, excludeIndexesSet)).toBe(-1);
  });

  it("제외 인덱스 세트를 넘기지 않으면 무작위의 인덱스를 리턴한다.", () => {
    expect(pickRandomIndex(2)).not.toBe(-1);
  });
});
