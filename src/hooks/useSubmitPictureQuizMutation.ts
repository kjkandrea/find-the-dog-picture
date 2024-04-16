import { useMutation } from "react-query";
import { pictureQuizApi, Quiz } from "~/api";

interface Query {
  quizId: Quiz["id"];
  answer: number;
}

export interface Feedback {
  correct: boolean;
  answer: number;
}

export const useSubmitPictureQuizMutation = () => {
  return useMutation<Feedback, unknown, Query>(
    ["quiz"],
    ({ quizId, answer }: Query) =>
      pictureQuizApi.postPictureQuiz(quizId, answer).then(({ correct }) => ({
        correct,
        answer,
      })),
  );
};
