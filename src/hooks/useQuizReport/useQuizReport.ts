import { Quiz } from "~/api";
import { useRef } from "react";
import { atom, useRecoilState } from "recoil";

export interface QuizSolveLog {
  quizId: Quiz["id"];
  squareMatrix: number;
  answer: number;
  correct: boolean;
}

export interface QuizReport {
  quizSolveLogs: QuizSolveLog[];
}

type UseQuizReport = () => {
  quizReport?: QuizReport;
  add(quizSolveLog: QuizSolveLog): void;
  submit(): void;
  reset(): void;
};

const quizReportState = atom<QuizReport | undefined>({
  key: "textState",
  default: undefined,
});

export const useQuizReport: UseQuizReport = () => {
  const [globalQuizReport, setGlobalQuizReport] =
    useRecoilState(quizReportState);
  const quizSolveLogs = useRef<QuizSolveLog[]>([]);

  const add = (quizSolveLog: QuizSolveLog) =>
    quizSolveLogs.current.push(quizSolveLog);

  const submit = () =>
    setGlobalQuizReport({
      quizSolveLogs: quizSolveLogs.current,
    });

  const reset = () => {
    quizSolveLogs.current = [];
    setGlobalQuizReport(undefined);
  };

  return {
    quizReport: globalQuizReport,
    add,
    submit,
    reset,
  };
};
