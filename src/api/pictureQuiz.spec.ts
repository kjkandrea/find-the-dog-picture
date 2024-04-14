import { pictureQuiz, Quiz } from "./pictureQuiz";
import { countBy } from "lodash-es";

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

    it("유효한 이미지 리소스 URL 을 포함한다.", async () => {
      const {
        quiz: { pictures },
      } = await pictureQuiz.getPictureQuiz();

      const image = new Image();
      image.onload = () => {
        expect(image.complete && image.naturalWidth > 0).toBeTruthy();
      };

      image.src = pictures.at(0)!;
    });

    it("원하는 갯수 만큼의 pictures 를 반환 받는다.", async () => {
      const {
        quiz: { pictures },
      } = await pictureQuiz.getPictureQuiz(4);

      expect(pictures.length).toBe(4);
    });

    it("요청 가능한 pictures 갯수는 2개 이상이다.", () => {
      expect(() => pictureQuiz.getPictureQuiz(1)).toThrow();
    });

    it("pictures 는 하나의 강아지 사진을 포함하고 고양이 사진들을 포함한다.", async () => {
      const {
        quiz: { pictures },
      } = await pictureQuiz.getPictureQuiz(4);

      const { dog, cat } = countBy(pictures, (pictureURL) =>
        pictureURL.includes("dog") ? "dog" : "cat",
      );

      expect(dog).toBe(1);
      expect(cat).toBe(3);
    });
  });
});
