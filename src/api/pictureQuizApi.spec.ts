import { pictureQuizApi, pictureQuiz } from "./pictureQuizApi";
import { describe, beforeEach, it, expect } from "@jest/globals";

describe("pictureQuizApi", () => {
  beforeEach(() => {
    pictureQuiz.reset();
  });

  it("getPictureQuiz 는 퀴즈를 반환한다.", async () => {
    const result = await pictureQuizApi.getPictureQuiz(2);
    expect(result.quiz).toBeTruthy();
  });

  it("postPictureQuiz 는 정답여부를 반환한다.", async () => {
    const { quiz } = await pictureQuizApi.getPictureQuiz(2);
    const result = await pictureQuizApi.postPictureQuiz(quiz.id, 0);
    expect(typeof result.correct).toBe("boolean");
  });
});
