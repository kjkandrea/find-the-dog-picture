import { useQuery } from "react-query";
import { pictureQuizApi, GetPictureQuizResponse } from "~/api";
import { chunk } from "lodash-es";

export interface Quiz {
  grid: GetPictureQuizResponse["pictures"][];
  id: GetPictureQuizResponse["id"];
}

const seed = 100000;

export const usePictureQuizQuery = (squareMatrixWidth: number) => {
  return useQuery<Quiz>(["quiz"], () =>
    pictureQuizApi
      .getPictureQuiz(squareMatrixWidth ** 2, seed)
      .then(({ quiz }) => ({
        grid: chunk(quiz.pictures, squareMatrixWidth),
        id: quiz.id,
      })),
  );
};
