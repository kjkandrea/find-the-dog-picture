import { pictureQuizApi } from "./pictureQuizApi";

describe("pictureQuizApi", () => {
  beforeEach(() => {
    pictureQuizApi.reset();
  });

  test("getPictureQuiz should return a Quiz", async () => {
    const result = await pictureQuizApi.getPictureQuiz(2);
    expect(result.quiz).toBeTruthy();
  });

  test("postPictureQuiz should return a Result", async () => {
    const { quiz } = await pictureQuizApi.getPictureQuiz(2);
    const result = await pictureQuizApi.postPictureQuiz(quiz.id, 0);
    expect(typeof result.correct).toBe("boolean");
  });
});
