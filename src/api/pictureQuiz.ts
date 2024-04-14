import { cats } from "./images/cats";
import { dogs } from "./images/dogs";
import { sampleSize } from "lodash-es";

type ResourceURL = string;
type UniqueId = number;

export interface Quiz {
  pictures: ResourceURL[];
  id: UniqueId;
}

export interface GetPictureQuizResponse {
  quiz: Quiz;
}

class PictureQuiz {
  public getPictureQuiz(
    // more than 1
    pictureLength: number = 4,
    seed: number = 0,
  ): Promise<GetPictureQuizResponse> {
    if (1 >= pictureLength) {
      throw new Error("bad request: pictureLength must be more than 1");
    }
    return this.fakeResponseDelay({
      quiz: {
        pictures: [...sampleSize(cats, pictureLength - 1), dogs[0]],
        id: this.generateUniqueId(),
      },
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
