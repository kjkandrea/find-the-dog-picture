import { useQuiz } from ".";
import { Feedback } from "./partials";
import { describe, it, expect, jest } from "@jest/globals";
import { usePictureQuizQuery, useSubmitPictureQuizMutation } from "./partials";
import { renderHook, act, waitFor } from "@testing-library/react";

jest.useFakeTimers();

jest.mock("./partials", () => ({
  usePictureQuizQuery: jest.fn().mockReturnValue({
    data: undefined,
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
  it("퀴즈가 반환되지 않았을 때에, solve 로 문제를 풀면 에러가 발생한다.", async () => {
    const { result } = renderHook(() => useQuiz());

    expect(() => result.current.solve(0)).toThrow();
  });

  it("step 은 1로 시작하며, solve 로 문제를 풀 때마다 정/오답에 관계없이 1씩 증가한다.", async () => {
    (usePictureQuizQuery as jest.Mock).mockReturnValue({
      data: { id: 1, pictures: ["dog", "cat"] },
      refetch: () => new Promise((resolve) => resolve(true)),
    });

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

  it("정답을 8번 맞추면 퀴즈가 종료된다.", async () => {
    const onComplete = jest.fn();

    const { result } = renderHook(() => useQuiz({ onComplete }));

    act(() => {
      Array.from({ length: 8 }, () => {
        result.current.solve(0);
        jest.runAllTimers();
      });
    });

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });

  it("정답과 관계없이 10번 시도하면 퀴즈가 종료된다.", async () => {
    (useSubmitPictureQuizMutation as jest.Mock).mockImplementation(
      (unknown) => {
        const options = unknown as { onSuccess: (feedback: Feedback) => void };

        return {
          data: { correct: false },
          mutate: () => {
            options.onSuccess({ correct: false });
          },
          reset: jest.fn(),
        };
      },
    );

    const onComplete = jest.fn();

    const { result } = renderHook(() => useQuiz({ onComplete }));

    act(() => {
      Array.from({ length: 10 }, () => {
        result.current.solve(0);
        jest.runAllTimers();
      });
    });

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });
});
