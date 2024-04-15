import { cats } from "./images/cats";
import { dogs } from "./images/dogs";
import { sampleSize, random } from "lodash-es";
import { pickRandomIndex } from "~/utils";

type ResourceURL = string;
type UniqueId = number;

export interface Quiz {
  pictures: ResourceURL[];
  id: UniqueId;
}

export interface GetPictureQuizResponse {
  quiz: Quiz;
}

export interface PostPictureQuizResponse {
  correct: boolean;
}

export class PictureQuiz {
  private correctIndexByQuizIdMap: Map<Quiz["id"], number> = new Map();
  private previousDogIndexesSetBySeed: Map<number, Set<number>> = new Map();
  private latestId: UniqueId = 0;

  public getPictureQuiz(
    // 2 이상
    pictureLength: number = 4,
    seed: number = 0,
  ): GetPictureQuizResponse {
    if (1 >= pictureLength) {
      throw new Error("bad request: pictureLength must be more than 1");
    }

    // 비즈니스 로직. 세션 당 10번 까지 지난 결과를 기록해두고, 10번을 초과하면 초기화
    const hasMax =
      this.previousDogIndexesSetBySeed.has(seed) &&
      this.previousDogIndexesSetBySeed.get(seed)!.size === 10;

    if (hasMax || !this.previousDogIndexesSetBySeed.has(seed)) {
      this.previousDogIndexesSetBySeed.set(seed, new Set());
    }

    const previousDogIndexesSet = this.previousDogIndexesSetBySeed.get(seed)!;
    const dogId = pickRandomIndex(dogs.length, previousDogIndexesSet);
    const dogPicture = dogs[dogId];

    previousDogIndexesSet.add(dogId);

    this.previousDogIndexesSetBySeed.set(seed, previousDogIndexesSet);

    const id = this.generateUniqueId();

    const pictures = sampleSize(cats, pictureLength);
    const lastIndex = pictures.length - 1;
    const dogIndex = random(0, lastIndex);
    pictures[dogIndex] = dogPicture;

    this.correctIndexByQuizIdMap.set(id, dogIndex);

    return {
      quiz: {
        pictures,
        id,
      },
    };
  }

  public postPictureQuiz(
    quizId: UniqueId,
    answer: number,
  ): PostPictureQuizResponse {
    const notFound = !this.correctIndexByQuizIdMap.has(quizId);
    if (notFound) {
      throw new Error("bad request: quiz is not found");
    }

    const correct = this.correctIndexByQuizIdMap.get(quizId) === answer;

    this.correctIndexByQuizIdMap.delete(quizId);

    return {
      correct,
    };
  }

  public reset() {
    this.correctIndexByQuizIdMap = new Map();
    this.previousDogIndexesSetBySeed = new Map();
    this.latestId = 0;
  }

  private generateUniqueId(): UniqueId {
    this.latestId += 1;
    return this.latestId;
  }
}
