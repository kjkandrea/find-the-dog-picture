import { PictureQuiz } from "~/api/PictureQuiz";
import { flow } from "lodash-es";

interface PictureQuizApi {
  getPictureQuiz: (
    ...args: Parameters<PictureQuiz["getPictureQuiz"]>
  ) => Promise<ReturnType<PictureQuiz["getPictureQuiz"]>>;
  postPictureQuiz: (
    ...args: Parameters<PictureQuiz["postPictureQuiz"]>
  ) => Promise<ReturnType<PictureQuiz["postPictureQuiz"]>>;
  reset: PictureQuiz["reset"];
}

const pictureQuiz = new PictureQuiz();

// singleton
export const pictureQuizApi: PictureQuizApi = {
  getPictureQuiz: flow(
    pictureQuiz.getPictureQuiz.bind(pictureQuiz),
    fakeResponseDelay,
  ),
  postPictureQuiz: flow(
    pictureQuiz.postPictureQuiz.bind(pictureQuiz),
    fakeResponseDelay,
  ),
  reset: pictureQuiz.reset.bind(pictureQuiz),
};

function fakeResponseDelay<ResponseBody>(
  responseBody: ResponseBody,
): Promise<ResponseBody> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responseBody);
    }, 200);
  });
}
