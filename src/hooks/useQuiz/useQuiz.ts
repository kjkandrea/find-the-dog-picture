import {
  usePictureQuizQuery,
  useSubmitPictureQuizMutation,
  Quiz,
  Feedback,
} from "./partials";
import { useState, useRef } from "react";

type UseQuiz = () => {
  solve(pictureIndex: number): void;
  step: number;
  quiz?: Quiz;
  feedback?: Feedback;
};

const businessLogic = {
  squareMatrixOrder: [2, 2, 3, 3, 4, 4, 5, 5],
  feedbackMilliSeconds: 2000,
} as const;

export const useQuiz: UseQuiz = () => {
  const currentSquareMatrixOrder = useRef(0);
  const [squareMatrixWidth, setSquareMatrixWidth] = useState(
    businessLogic.squareMatrixOrder.at(currentSquareMatrixOrder.current)!,
  );
  const [step, setStep] = useState(1);

  const { data: quiz, refetch } = usePictureQuizQuery(squareMatrixWidth);
  const {
    data: feedback,
    mutate,
    reset,
  } = useSubmitPictureQuizMutation({
    onSuccess(feedback) {
      if (feedback.correct) {
        currentSquareMatrixOrder.current += 1;
      }
      const nextSquareMatrix = businessLogic.squareMatrixOrder.at(
        currentSquareMatrixOrder.current,
      );

      if (!nextSquareMatrix) {
        // TODO: done 처리
        return;
      }

      setSquareMatrixWidth(nextSquareMatrix);

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
