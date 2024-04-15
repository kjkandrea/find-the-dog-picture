import { pictureQuiz, Quiz } from "./pictureQuiz";
import { countBy, uniq } from "lodash-es";

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

    it("시드가 있으면 10번 까지 이전 요청과 다른 강아지 사진을 반환한다.", async () => {
      const seed = 1;

      const responses = await Promise.all(
        Array.from({ length: 10 }, () => pictureQuiz.getPictureQuiz(2, seed)),
      );

      const dogPictures = responses.map(({ quiz }) =>
        quiz.pictures.find((resourceURL) => resourceURL.includes("dog")),
      );

      expect(uniq(dogPictures).length).toBe(10);
    });

    it("강아지 사진은 무작위 순번에 위치한다.", async () => {
      const EXPECT_CASE_COUNT = 2;
      const seed = 1;

      const responses = await Promise.all(
        Array.from({ length: 100 }, () =>
          pictureQuiz.getPictureQuiz(EXPECT_CASE_COUNT, seed),
        ),
      );

      const dogPictureIndexes = responses.map(({ quiz }) =>
        quiz.pictures.findIndex((resourceURL) => resourceURL.includes("dog")),
      );

      expect(uniq(dogPictureIndexes).length).toBe(EXPECT_CASE_COUNT);
    });
  });
});
