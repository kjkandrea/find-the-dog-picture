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

      alert("잘못된 접근입니다.");
      navigate("/");
    },
    [navigate, quizReport],
  );

  return quizReport ? <QuizReport quizReport={quizReport} /> : null;
};
