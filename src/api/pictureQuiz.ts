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
  public getPictureQuiz(): Promise<GetPictureQuizResponse> {
    return this.fakeResponseDelay({
      quiz: {
        pictures: ["url"],
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
