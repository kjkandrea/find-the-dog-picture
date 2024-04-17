import { useQuiz } from ".";
import { Feedback } from "./partials";
import { describe, it, expect, jest } from "@jest/globals";
import { renderHook, act, waitFor } from "@testing-library/react";

jest.useFakeTimers();

jest.mock("./partials", () => ({
  usePictureQuizQuery: jest.fn().mockReturnValue({
    data: { id: 1, pictures: ["dog", "cat"] },
    refetch: () => new Promise((resolve) => resolve(true)),
  }),
  useSubmitPictureQuizMutation: jest.fn().mockImplementation((unknown) => {
    const options = unknown as { onSuccess: (feedback: Feedback) => void };

    return {
      data: { correct: true },
      mutate: () => {
        options.onSuccess({ correct: true });
      },
      reset: jest.fn(),
    };
  }),
}));

describe("useQuiz", () => {
  it("step 은 1로 시작하며, solve 로 문제를 풀 때마다 정/오답에 관계없이 1씩 증가한다.", async () => {
    const { result } = renderHook(() => useQuiz());

    expect(result.current.step).toBe(1);

    act(() => {
      result.current.solve(0);
      jest.runAllTimers();
    });

    await waitFor(() => expect(result.current.step).toBe(2));

    act(() => {
      result.current.solve(-1);
      jest.runAllTimers();
    });

    await waitFor(() => expect(result.current.step).toBe(3));
  });
});
