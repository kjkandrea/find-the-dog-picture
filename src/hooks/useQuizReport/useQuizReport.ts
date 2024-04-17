import { Quiz } from "~/api";

export interface QuizSolveLog {
  quizId: Quiz["id"];
  squareMatrix: number;
  answer: number;
  correct: number;
}

export interface QuizReport {
  quizSolveLogs: QuizSolveLog[];
}

type UseQuizReport = () => {
  add(quizSolveLog: QuizSolveLog): void;
  submit(): void;
  delete(): void;
};

export const useQuizReport: UseQuizReport = () => {
  return {
    add: () => {},
    submit: () => {},
    delete: () => {},
  };
};
