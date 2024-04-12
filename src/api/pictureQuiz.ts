type ResourceURL = string;

interface Quiz {
  pictures: ResourceURL[];
  id: number;
}

interface GetPictureQuizResponse {
  quiz: Quiz;
}

export class PictureQuiz {
  public getPictureQuiz(): GetPictureQuizResponse {
    return {
      quiz: {
        pictures: ["url"],
        id: 1,
      },
    };
  }
}
