import { useQuery } from "react-query";
import { pictureQuizApi, GetPictureQuizResponse } from "~/api";
import { chunk } from "lodash-es";

export interface Quiz {
  grid: GetPictureQuizResponse["pictures"][];
  id: GetPictureQuizResponse["id"];
}

export const usePictureQuizQuery = (squareMatrixWidth: number) => {
  const seed = Date.now();

  return useQuery<Quiz>(["quiz"], () =>
    pictureQuizApi
      .getPictureQuiz(squareMatrixWidth ** 2, seed)
      .then(({ quiz }) => ({
        grid: chunk(quiz.pictures, squareMatrixWidth),
        id: quiz.id,
      })),
  );
};
