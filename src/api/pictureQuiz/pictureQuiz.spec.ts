import { pictureQuiz, Quiz } from "./pictureQuiz";
import { countBy, uniq } from "lodash-es";

describe("pictureQuiz", () => {
  beforeEach(() => {
    pictureQuiz.reset();
  });

  describe("getPictureQuiz", () => {
    it("모든 퀴즈는 아이디를 지니며 중복되지 않는다.", () => {
      const EXPECT_LENGTH = 3;

      const responses = Array.from({ length: EXPECT_LENGTH }, () =>
        pictureQuiz.getPictureQuiz(),
      );

      const quizIdSet = new Set<Quiz["id"]>(
        responses.map(({ quiz }) => quiz.id),
      );

      expect(quizIdSet.size).toBe(EXPECT_LENGTH);
    });

    it("유효한 이미지 리소스 URL 을 포함한다.", () => {
      const {
        quiz: { pictures },
      } = pictureQuiz.getPictureQuiz();

      const image = new Image();
      image.onload = () => {
        expect(image.complete && image.naturalWidth > 0).toBeTruthy();
      };

      image.src = pictures.at(0)!;
    });

    it("원하는 갯수 만큼의 pictures 를 반환 받는다.", () => {
      const {
        quiz: { pictures },
      } = pictureQuiz.getPictureQuiz(4);

      expect(pictures.length).toBe(4);
    });

    it("요청 가능한 pictures 갯수는 2개 이상이다.", () => {
      expect(() => pictureQuiz.getPictureQuiz(1)).toThrow();
    });

    it("pictures 는 하나의 강아지 사진을 포함하고 고양이 사진들을 포함한다.", () => {
      const {
        quiz: { pictures },
      } = pictureQuiz.getPictureQuiz(4);

      const { dog, cat } = countBy(pictures, (pictureURL) =>
        pictureURL.includes("dog") ? "dog" : "cat",
      );

      expect(dog).toBe(1);
      expect(cat).toBe(3);
    });

    it("시드가 있으면 10번 까지 이전 요청과 다른 강아지 사진을 반환한다.", () => {
      const seed = 1;

      const responses = Array.from({ length: 10 }, () =>
        pictureQuiz.getPictureQuiz(2, seed),
      );

      const dogPictures = responses.map(({ quiz }) =>
        quiz.pictures.find((resourceURL) => resourceURL.includes("dog")),
      );

      expect(uniq(dogPictures).length).toBe(10);
    });

    it("강아지 사진은 무작위 순번에 위치한다.", () => {
      const EXPECT_CASE_COUNT = 2;

      const responses = Array.from({ length: 100 }, () =>
        pictureQuiz.getPictureQuiz(EXPECT_CASE_COUNT),
      );

      const dogPictureIndexes = responses.map(({ quiz }) =>
        quiz.pictures.findIndex((resourceURL) => resourceURL.includes("dog")),
      );

      expect(uniq(dogPictureIndexes).length).toBe(EXPECT_CASE_COUNT);
    });
  });

  describe("postPictureQuiz", () => {
    it("퀴즈에 대해, 올바른 강아지 사진의 순번을 도출하면 결과는 correct:true 이다.", () => {
      const { quiz } = pictureQuiz.getPictureQuiz();

      const correctAnswer = quiz.pictures.findIndex((picture) =>
        picture.includes("dog"),
      );

      const { correct } = pictureQuiz.postPictureQuiz(quiz.id, correctAnswer);
      expect(correct).toBe(true);
    });

    it("퀴즈에 대해, 잘못된 강아지 사진의 순번을 도출하면 결과는 correct:false 이다.", () => {
      const { quiz } = pictureQuiz.getPictureQuiz();

      const wrongAnswer = quiz.pictures.findIndex(
        (picture) => !picture.includes("dog"),
      );

      const { correct } = pictureQuiz.postPictureQuiz(quiz.id, wrongAnswer);
      expect(correct).toBe(false);
    });

    it("생성되지 않은 퀴즈를 맞출 수 없다.", () => {
      expect(() => pictureQuiz.postPictureQuiz(1, 0)).toThrow();
    });
  });

  describe("reset", () => {
    it("모든 문제 기록을 삭제한다.", () => {
      const { quiz } = pictureQuiz.getPictureQuiz();

      pictureQuiz.reset();

      expect(() => pictureQuiz.postPictureQuiz(quiz.id, 0)).toThrow();
    });
  });
});
