import {
  usePictureQuizQuery,
  useSubmitPictureQuizMutation,
  Quiz,
  Feedback,
} from "./partials";
import { useState } from "react";

type UseQuiz = () => {
  solve(pictureIndex: number): void;
  step: number;
  quiz?: Quiz;
  feedback?: Feedback;
};

const businessLogic = {
  squareMatrixOrder: [2],
  feedbackMilliSeconds: 2000,
} as const;

export const useQuiz: UseQuiz = () => {
  const [squareMatrixWidth] = useState(businessLogic.squareMatrixOrder.at(0)!);
  const [step, setStep] = useState(1);

  const { data: quiz, refetch } = usePictureQuizQuery(squareMatrixWidth);
  const {
    data: feedback,
    mutate,
    reset,
  } = useSubmitPictureQuizMutation({
    onSuccess() {
      setTimeout(() => {
        refetch().then(() => {
          reset();
          setStep((prev) => prev + 1);
        });
      }, businessLogic.feedbackMilliSeconds);
    },
  });

  const solve: UseQuiz["solve"] = (pictureIndex) => {
    if (!quiz) {
      throw new Error("client error: quiz does not exist");
    }
    mutate({
      quizId: quiz.id,
      answer: pictureIndex,
    });
  };

  return {
    solve,
    feedback,
    quiz,
    step,
  };
};
