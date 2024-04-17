import { useQuizReport, QuizSolveLog } from ".";
import { describe, it, expect, jest } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useState } from "react";

jest.mock("recoil", () => ({
  atom: jest.fn(),
  useRecoilState: jest.fn((initValue) => useState(initValue)),
}));

describe("useQuizReport", () => {
  it("레포트를 작성하고 제출하면 레포트가 반환된다. 레포트를 초기화하면 레포트가 지워진다.", () => {
    const { result } = renderHook(() => useQuizReport());

    const quizSolveLog: QuizSolveLog = {
      quizId: 1,
      squareMatrix: 2,
      correct: true,
      answer: 1,
      timestamp: new Date().toISOString(),
    };

    act(() => result.current.add(quizSolveLog));

    expect(result.current.quizReport).toBeUndefined();

    act(() => result.current.submit());

    expect(result.current.quizReport?.quizSolveLogs).toEqual([quizSolveLog]);

    act(() => result.current.reset());

    expect(result.current.quizReport).toBeUndefined();

    act(() => result.current.submit());

    expect(result.current.quizReport?.quizSolveLogs).toEqual([]);
  });
});
