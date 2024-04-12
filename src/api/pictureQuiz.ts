type ResourceURL = string;

interface Quiz {
  pictures: ResourceURL[];
}

interface GetPictureQuizzesResponse {
  quiz: Quiz[];
}

export class PictureQuiz {
  public getPictureQuizzes(): GetPictureQuizzesResponse {
    return {
      quiz: [],
    };
  }
}
