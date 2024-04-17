import { useMutation } from "react-query";
import { pictureQuizApi, Quiz } from "~/api";

interface Query {
  quizId: Quiz["id"];
  answer: number;
}

export interface Feedback {
  correct: boolean;
}

export const useSubmitPictureQuizMutation = (options?: {
  onSuccess?: (feedback: Feedback) => void;
}) =>
  useMutation<Feedback, unknown, Query>(
    ["quiz"],
    ({ quizId, answer }: Query) =>
      pictureQuizApi.postPictureQuiz(quizId, answer),
    options,
  );
