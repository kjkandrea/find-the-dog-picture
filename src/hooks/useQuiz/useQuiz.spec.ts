import { useQuiz } from ".";
import { usePictureQuizQuery, useSubmitPictureQuizMutation } from "./partials";
import { describe, it, expect, jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";

jest.mock("./partials", () => ({
  usePictureQuizQuery: jest.fn(),
  useSubmitPictureQuizMutation: jest.fn(),
}));

describe("useQuiz", () => {
  it("test", () => {
    (usePictureQuizQuery as jest.Mock).mockReturnValue({
      data: { id: 1, pictures: [] },
      refetch: jest.fn(),
    });

    (useSubmitPictureQuizMutation as jest.Mock).mockReturnValue({
      data: undefined,
      mutate: jest.fn(),
      reset: jest.fn(),
    });

    const { result } = renderHook(() => useQuiz({}));

    console.log(result);

    expect(true).toBe(true);
  });
});
