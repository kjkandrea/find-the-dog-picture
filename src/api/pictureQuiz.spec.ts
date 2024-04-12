import { pictureQuiz, Quiz } from "./pictureQuiz";

describe("pictureQuiz", () => {
  describe("getPictureQuiz", () => {
    it("모든 퀴즈는 아이디를 지니며 중복되지 않는다.", async () => {
      const EXPECT_LENGTH = 3;

      const responses = await Promise.all(
        Array.from({ length: EXPECT_LENGTH }, () =>
          pictureQuiz.getPictureQuiz(),
        ),
      );

      const quizIdSet = new Set<Quiz["id"]>(
        responses.map(({ quiz }) => quiz.id),
      );

      expect(quizIdSet.size).toBe(EXPECT_LENGTH);
    });
  });
});
