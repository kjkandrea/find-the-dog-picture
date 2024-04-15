import { useQuery } from "react-query";
import { pictureQuizApi, Quiz } from "~/api";
import { chunk } from "lodash-es";

type PictureQuizQueryResult = {
  grid: string[][];
  id: Quiz["id"];
};

export const usePictureQuizQuery = (squareMatrixWidth: number) => {
  const seed = Date.now();

  return useQuery(["quiz"], () =>
    pictureQuizApi.getPictureQuiz(squareMatrixWidth ** 2, seed).then(
      ({ quiz }): PictureQuizQueryResult => ({
        grid: chunk(quiz.pictures, squareMatrixWidth),
        id: quiz.id,
      }),
    ),
  );
};
