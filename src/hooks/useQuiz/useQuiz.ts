import {
  usePictureQuizQuery,
  useSubmitPictureQuizMutation,
  Quiz,
  Feedback,
} from "./partials";
import { useState, useRef } from "react";

export interface UseQuizParameter {
  onComplete?: () => void;
}

type UseQuiz = (parameter: UseQuizParameter) => {
  solve(pictureIndex: number): void;
  step: number;
  quiz?: Quiz;
  feedback?: Feedback;
};

const businessLogic = {
  squareMatrixOrder: [2, 2, 3, 3, 4, 4, 5, 5],
  feedbackMilliSeconds: 2000,
  maxTryCount: 10,
} as const;

export const useQuiz: UseQuiz = ({ onComplete }) => {
  const currentTryCount = useRef(0);
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
      currentTryCount.current += 1;

      if (feedback.correct) {
        currentSquareMatrixOrder.current += 1;
      }
      const nextSquareMatrix = businessLogic.squareMatrixOrder.at(
        currentSquareMatrixOrder.current,
      );

      if (
        // 준비된 모든 문제를 풀었으므로 종료
        !nextSquareMatrix ||
        // 퀴즈 한도를 초과했으므로 종료
        currentTryCount.current >= businessLogic.maxTryCount
      ) {
        onComplete?.();
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
