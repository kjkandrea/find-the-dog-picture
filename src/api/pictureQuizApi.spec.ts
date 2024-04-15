import { pictureQuizApi, pictureQuiz } from "./pictureQuizApi";
import { describe, beforeEach, it, expect } from "@jest/globals";

describe("pictureQuizApi", () => {
  beforeEach(() => {
    pictureQuiz.reset();
  });

  it("getPictureQuiz should return a Quiz", async () => {
    const result = await pictureQuizApi.getPictureQuiz(2);
    expect(result.quiz).toBeTruthy();
  });

  it("postPictureQuiz should return a Result", async () => {
    const { quiz } = await pictureQuizApi.getPictureQuiz(2);
    const result = await pictureQuizApi.postPictureQuiz(quiz.id, 0);
    expect(typeof result.correct).toBe("boolean");
  });
});
