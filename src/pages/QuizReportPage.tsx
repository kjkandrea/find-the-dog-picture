import { QuizReport } from "~/components";
import { useQuizReport } from "~/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const QuizReportPage = () => {
  const navigate = useNavigate();
  const { quizReport } = useQuizReport();

  useEffect(
    function exceptionGuard() {
      if (quizReport) return;
      navigate("/not-found");
    },
    [navigate, quizReport],
  );

  return quizReport ? <QuizReport quizReport={quizReport} /> : null;
};
