import { cats } from "./images/cats";
import { dogs } from "./images/dogs";
import { sampleSize, shuffle } from "lodash-es";
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

class PictureQuiz {
  private previousDogIndexesSetBySeed: Map<number, Set<number>> = new Map();

  public getPictureQuiz(
    // 2 이상
    pictureLength: number = 4,
    seed: number = 0,
  ): Promise<GetPictureQuizResponse> {
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
    const dogIndex = pickRandomIndex(dogs.length, previousDogIndexesSet);

    previousDogIndexesSet.add(dogIndex);

    this.previousDogIndexesSetBySeed.set(seed, previousDogIndexesSet);

    return this.fakeResponseDelay({
      quiz: {
        // TODO: shuffle 보단 무작위 인덱스를 뽑아 정답을 기록해두고, 해당 인덱스에 강아지를 위치시키는게 성능 좋을듯
        pictures: shuffle([
          ...sampleSize(cats, pictureLength - 1),
          dogs[dogIndex],
        ]),
        id: this.generateUniqueId(),
      },
    });
  }

  public postPictureQuiz(
    quizId: UniqueId,
    answer: number,
  ): Promise<PostPictureQuizResponse> {
    return this.fakeResponseDelay({
      correct: true,
    });
  }

  private latestId: UniqueId = 0;
  private generateUniqueId(): UniqueId {
    this.latestId += 1;
    return this.latestId;
  }

  private fakeResponseDelay<T>(responseBody: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(responseBody);
      }, 200);
    });
  }
}

export const pictureQuiz = new PictureQuiz();
